import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/world-map',
    pathMatch: 'full'
  },
  {
    path: 'world',
    loadChildren: () => import('./pages/world-map/world-map.module').then((m) => m.WorldMapModule),
  },
  {
    path: 'city/:id',
    loadChildren: () => import('./pages/selected-city/selected-city.module').then((m) => m.SelectedCityModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
