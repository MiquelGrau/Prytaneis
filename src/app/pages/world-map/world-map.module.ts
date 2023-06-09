import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { WorldMapComponent } from './world-map.component';
import { WorldMapRoutingModule } from './world-map-routing.module';
import { MockHttpInterceptor } from '../../core/interceptors/mock-http.interceptor';
import { WorldMapEffects } from '../../shared/store/world-map/world-map.effects';
import { worldMapForFeature, worldMapReducer } from '../../shared/store/world-map/world-map.reducer';

@NgModule({
  declarations: [
    WorldMapComponent
  ],
  imports: [
    CommonModule,
    WorldMapRoutingModule,
    StoreModule.forFeature(worldMapForFeature, worldMapReducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([WorldMapEffects]),
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
export class WorldMapModule { }
