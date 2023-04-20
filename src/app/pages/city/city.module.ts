import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MockHttpInterceptor } from '../../core/interceptors/mock-http.interceptor';
import { CityComponent } from './city.component';
import { CityRoutingModule } from './city-routing.module';
import { cityForFeature, cityReducer } from '../../shared/store/city/city.reducer';
import { CityEffects } from '../../shared/store/city/city.effects';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { MarketComponent } from './components/market/market.component';

@NgModule({
  declarations: [
    CityComponent,
    WarehouseComponent,
    MarketComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    StoreModule.forFeature(cityForFeature, cityReducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([CityEffects]),
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
export class CityModule { }
