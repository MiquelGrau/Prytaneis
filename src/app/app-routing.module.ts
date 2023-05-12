import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/world',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'world',
    loadChildren: () => import('./pages/world-map/world-map.module').then((m) => m.WorldMapModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'city/:id',
    loadChildren: () => import('./pages/city/city.module').then((m) => m.CityModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/sign-in',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

