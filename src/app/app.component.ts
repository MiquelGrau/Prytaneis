import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Your App Title';

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        const userId = user.sub;
        this.http.post(`${environment.api_url}/users/register`, { userId })
          .pipe(tap((response) => console.log('User registered in the database', response)))
          .subscribe();
      }
    });
  }
}
