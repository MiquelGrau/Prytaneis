import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadWorldCities } from '../../shared/store/world-map/world-map.actions';
import { loadCity } from '../../shared/store/city/city.actions';

@Injectable({
  providedIn: 'root',
})
export class CityResolver implements Resolve<any> {
  constructor (
    private store: Store<any>
  ){}

  resolve(route: ActivatedRouteSnapshot): void {
    const id = route.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadCity({cityId: id}));
    }
  }
}
