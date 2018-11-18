import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageServiceProvider {

  private url: string = "http://validate.jsontest.com/?json=%7B%22key%22:%22value%22%7D";



  constructor(private http: Http) {
    console.log('Hello MessageServiceProvider Provider');
  }

  getMessages(){
    return this.http.get(this.url) 
    .do(this.logResponse)
    .map(this.extractDate)
    .catch(this.catchError)
  }

  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server error");
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractDate(res: Response){
    return res.json();
  }
}
