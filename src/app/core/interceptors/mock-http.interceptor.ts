import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of } from 'rxjs';
import * as vehicleMock from '../../../assets/mock-data/vehicle.mock.json';
import { environment } from 'src/environments/environment';

const urls = [
  {
    url: environment.api_url + '/vehicle',
    json: vehicleMock
  },
]

@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (req.url === element.url) {
        console.log('Loaded from json : ' + req.url);
        return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
      }
    }
    console.log('Loaded from http call :' + req.url);
    return next.handle(req);
  }
}
