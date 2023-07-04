import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MockHttpInterceptor } from '../../core/interceptors/mock-http.interceptor';
import { PathEffects } from '../../shared/store/path/path.effects';
import { pathFeature, pathReducer } from '../../shared/store/path/path.reducer';
import { WorldMapComponent } from '../../shared/components/world-map/world-map.component';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { nodeFeature, nodeReducer } from '../../shared/store/node/node.reducer';
import { NodeEffects } from '../../shared/store/node/node.effects';

@NgModule({
  declarations: [
    LobbyComponent,
    WorldMapComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    StoreModule.forFeature(pathFeature, pathReducer),
    StoreModule.forFeature(nodeFeature, nodeReducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([PathEffects, NodeEffects]),
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
export class LobbyModule { }
