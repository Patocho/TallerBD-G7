import {Component} from '@angular/core';
import {Httptestservice} from "./httptest.service"
import {AreaChartConfig} from '../area-chart/area-chart-config';

@Component({
  selector: 'httptest',
  template:`
  <div style ="background-color: #d8ecf7; border: 1px solid #afcde3">
  			<label for="range">Range:</label>
<style type="text/css">
  button {
 border: none;
 background: #3a7999;
 color: #f2f2f2;
 padding: 10px;
 font-size: 18px;
 border-radius: 5px;
 position: relative;
 box-sizing: border-box;
 transition: all 500ms ease;
}
button:before {
 content:'';
 position: absolute;
 top: 0px;
 left: 0px;
 width: 0px;
 height: 42px;
 background: rgba(255,255,255,0.3);
 border-radius: 5px;
 transition: all 2s ease;
}

button:hover:before {
 width: 100%;
}
  </style>

	<input name="range" type="text" [(ngModel)]="range" placeholder="range" />
	<button (click)="onTestGet()">GET Tweets</button>
	<button (click)="onGetStats()">GET Stats</button>
	<button (click)="onGenerateDataViz()">GET Stats + DataViz</button>
	<button (click)="delete()">Delete JSON</button>
		<p>Output: {{getData}}</p>
	<br>
	<br>
	<app-area-chart [config]="areaChartConfig"></app-area-chart>
	</div>

		
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
