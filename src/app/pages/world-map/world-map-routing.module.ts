import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorldMapComponent } from './world-map.component';
import { CitiesResolver } from '../../core/resolvers/cities.resolver';

const routes: Routes = [
  {
    path: '',
    component: WorldMapComponent,
    resolve: { cities: CitiesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldMapRoutingModule { }
