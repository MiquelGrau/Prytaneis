import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(private http: HttpClient) {}

  public getPaths(): Observable<any> {
    return this.http.get(environment.api_url + '/paths');
  }
}
