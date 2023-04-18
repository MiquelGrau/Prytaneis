import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {}

  getCity(id: string): Observable<any> {
    return this.http.get(environment.api_url + '/city/' + id);
  }
}
