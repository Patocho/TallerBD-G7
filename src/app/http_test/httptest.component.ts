import {Component} from '@angular/core';
import {Httptestservice} from "./httptest.service"
import {AreaChartConfig} from '../area-chart/area-chart-config';
@Component({
  selector: 'httptest',
  template:`
  			<label for="range">Range:</label>
	<input name="range" type="text" [(ngModel)]="range" placeholder="range" />
	<button (click)="onTestGet()">GET Tweets</button>
	<button (click)="onGetStats()">GET Stats</button>
	<button (click)="onGenerateDataViz()">GET Stats + DataViz</button>
	<button (click)="delete()">Delete JSON</button>
	<br>
	<p>Output: {{getData}}</p>
	<br>
	<app-area-chart [config]="areaChartConfig"></app-area-chart>	
    ` ,
  providers: [Httptestservice]		
})
export class HttptestComponent {

	private range: string='weekly';
	private areaChartConfig: Array<AreaChartConfig>;
	getData: string;

	constructor (private _Httpservice: Httptestservice){}

	onTestGet(){
		this._Httpservice.getInfo()
			.subscribe(
				data => this.getData = JSON.stringify(data),
				error => alert(error),
			 	() => console.log("Finished")
			);
	}

	onGetStats(){
		this._Httpservice.getStats(this.range).subscribe(
			data => this.getData = JSON.stringify(data),
			error => alert(error),
			() => console.log("Finished")		
		);
	}

	onGenerateDataViz() {
    	this._Httpservice.getStats(this.range).subscribe((stats: any) => {
        	// We create a new AreaChartConfig object to set number of tweets config
        	let tweetsArea: AreaChartConfig = {
          		settings: {
            		fill: 'rgba(1, 67, 163, 1)',
            		interpolation: 'none'
          		}, 
          		dataset: stats.map(data => {
            		return { x: new Date(data.date), y: data.count };
          		})
        	};

        	// to finish we append our AreaChartConfigs into an array of configs 
        	this.areaChartConfig = new Array<AreaChartConfig>();
        	this.areaChartConfig.push(tweetsArea);
        });
  	}



	delete(){

		this.getData="";
	}	

}
