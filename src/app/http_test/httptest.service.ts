import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http'

@Injectable()
export class Httptestservice{
	constructor (private _http: Http){}

	getInfo(){
	
		return this._http.get('http://0.0.0.0:3000/api/Tweets').map((response:Response) => response.json());
	}
	postJSON(){

		var json = JSON.stringify({var1: 'test', var2: 3})
		var params = 'json=' + json;
		var headers = new Headers();
		headers.append('Content-Type', 
		'application/x-www-form-urlencoded');

		return this._http.post('http://0.0.0.0:3000/explorer/#!/Tweet/Tweet_create', params, {
			headers: headers
		})
		.map(res => res.json());
	
	}

	getStats(range: string){
		return this._http.get('http://0.0.0.0:3000/api/Tweets/stats?range='+range).map((response:Response) => response.json());
	}


}