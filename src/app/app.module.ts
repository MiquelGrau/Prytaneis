import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { MockHttpInterceptor } from "./core/interceptors/mock-http.interceptor";
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CustomAuthInterceptor } from './core/interceptors/custom-auth.interceptor';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { WorldMapComponent } from './shared/components/world-map/world-map.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LobbyComponent,
    WorldMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AuthModule.forRoot({
      domain: 'dev-86wwefgk7d4nuz4f.eu.auth0.com',
      clientId: 'eoVHN30Bgm19V7uBDPPz4hUf8Wc2SqY6',
      authorizationParams: {
        audience: 'https://dev-86wwefgk7d4nuz4f.eu.auth0.com/api/v2/',
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
      }
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockHttpInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
