import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(public auth: AuthService) {}

  login(): void {
    this.auth.loginWithRedirect({
      appState: { target: '/world' },
    });
  }
}
