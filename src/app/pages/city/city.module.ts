import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { combineReducers, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MockHttpInterceptor } from '../../core/interceptors/mock-http.interceptor';
import { CityComponent } from './city.component';
import { CityRoutingModule } from './city-routing.module';
import { cityFeature, cityReducer } from '../../shared/store/city/city.reducer';
import { CityEffects } from '../../shared/store/city/city.effects';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { MarketComponent } from './components/market/market.component';
import { marketFeature, marketReducer } from '../../shared/store/market/market.reducer';
import { MarketEffects } from '../../shared/store/market/market.effects';
import { MarketGoodsComponent } from './components/market/market-goods/market-goods.component';
import { FormsModule } from '@angular/forms';
import { GoodsArrayPipe } from '../../shared/pipes/goods-array.pipe';
import { MaxGoodsDirective } from './components/market/market-goods/market-goods.directive';
import { WarehouseEffects } from '../../shared/store/warhouse/warehouse.effects';
import { warehouseFeature, warehouseReducer } from '../../shared/store/warhouse/warehouse.reducer';

@NgModule({
  declarations: [
    CityComponent,
    WarehouseComponent,
    MarketComponent,
    MarketGoodsComponent,
    GoodsArrayPipe,
    MaxGoodsDirective
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    StoreModule.forFeature(cityFeature, cityReducer),
    StoreModule.forFeature(warehouseFeature, warehouseReducer),
    StoreModule.forFeature(marketFeature, marketReducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([CityEffects, MarketEffects, WarehouseEffects]),
    FormsModule,
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
