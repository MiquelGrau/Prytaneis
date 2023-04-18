import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityComponent } from './city.component';
import { CityResolver } from '../../core/resolvers/city.resolver';

const routes: Routes = [
  {
    path: '',
    component: CityComponent,
    resolve: { city: CityResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
