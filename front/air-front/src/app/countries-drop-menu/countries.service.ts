import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {obj} from './countries-drop-menu.component';
@Injectable()
export class CountriesService {

    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
    getConfig(): Observable<any> {
        return this.http.get('https://air-map-api.herokuapp.com/countries');
    }
    getPollutionLevels(countryCode): Observable<any> {
        return this.http.get('https://air-map-api.herokuapp.com/air-info?country=' + countryCode);
    }
    getPolluants(): Observable<any> {
        return this.http.get('https://air-map-api.herokuapp.com/polluants');
    }
    getPrediction() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://ml-api-air.herokuapp.com/predict', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    value: obj
}));

    const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
    }
}
