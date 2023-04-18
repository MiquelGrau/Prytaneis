import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MockHttpInterceptor } from '../../core/interceptors/mock-http.interceptor';
import { SelectedCityComponent } from './selected-city.component';
import { SelectedCityRoutingModule } from './selected-city-routing.module';

@NgModule({
  declarations: [
    SelectedCityComponent
  ],
  imports: [
    CommonModule,
    SelectedCityRoutingModule,
    // StoreModule.forFeature('cityData', CITY_REDUCERS),
    // StoreDevtoolsModule.instrument(),
    // EffectsModule.forFeature([CityEffects]),
  ],
  exports: [],
  bootstrap: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockHttpInterceptor,
      multi: true
    }
  ],
})
export class SelectedCityModule { }
