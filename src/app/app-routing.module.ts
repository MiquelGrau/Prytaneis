import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityModule } from './pages/city/city.module';

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
    loadChildren: () => import('./pages/city/city.module').then((m) => m.CityModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
