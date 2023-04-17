import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CITIES_REDUCERS } from '../../shared/store/cities/cities.state';
import { CitiesEffects } from '../../shared/store/cities/cities.effects';
import { WorldMapComponent } from './world-map.component';
import { MockHttpInterceptor } from '../../core/interceptors/mock-http.interceptor';

@NgModule({
  declarations: [
    WorldMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forFeature('cities', CITIES_REDUCERS),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([CitiesEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class WorldMapModule { }
