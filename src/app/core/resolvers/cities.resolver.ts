import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadWorldCities } from '../../shared/store/world-map/world-map.actions';

@Injectable({
  providedIn: 'root',
})
export class CitiesResolver implements Resolve<any> {
  constructor (
    private store: Store<any>
  ){}

  resolve(route: ActivatedRouteSnapshot): void {
    this.store.dispatch(loadWorldCities());
  }
}
