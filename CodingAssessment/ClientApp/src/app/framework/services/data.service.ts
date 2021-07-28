import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()

export class DataService {

  serverUrl = "";
  apiUrl: string;

  constructor(private http: HttpClient, private cs: ConfigService, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = "https://localhost:5001/";
  }

  //Used for API calls
  get(action: string, params: HttpParams) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), params: params
    };
    return this.http.get(this.apiUrl + action, options)
  }

  post(action: string, parameters: object) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.debugLog(this.apiUrl);
    return this.http.post(this.apiUrl + action, JSON.stringify(parameters), options);
  }

  /*=================================================================
  Debug Handling
  ================================================================*/
  debugEnabled: boolean = false;
  debugLogPage: String = "data.service";

  debugLog(obj: any, description: string = null) {

    if (this.debugEnabled == true) {
      console.group(this.debugLogPage + " - " + description);
      this.debugLog(obj);
      console.groupEnd();
    }
  }

}
