import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectedCityComponent } from './selected-city.component';
import { CityResolver } from '../../core/resolvers/city.resolver';

const routes: Routes = [
  {
    path: '',
    component: SelectedCityComponent,
    resolve: { city: CityResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectedCityRoutingModule { }
