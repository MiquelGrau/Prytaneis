import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class CustomAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.api_url)) {
      return next.handle(req);
    }

    return this.authService.getAccessTokenSilently().pipe(
      switchMap((token) => {
        console.log('Received token: ', token);
        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(cloned);
      }),
    );
  }
}
