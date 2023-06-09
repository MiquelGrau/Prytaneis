import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of } from 'rxjs';
import * as marketMock from '../../../assets/mock-data/market.mock.json';
import { environment } from 'src/environments/environment';

const apiUrl = environment.api_url;

const urls = [
  {
    url: `${apiUrl}/aaaaaaaaaaa`,
    json: marketMock
  },
]

@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (req.url === element.url || req.url.startsWith(element.url)) {
        console.log('Loaded from json : ' + req.url);
        return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
      }
    }
    console.log('Loaded from http call :' + req.url);
    return next.handle(req);
  }
}
