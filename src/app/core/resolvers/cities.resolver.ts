import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadCities } from '../../shared/store/cities/cities.actions';
import { selectCities } from '../../shared/store/cities/cities.selectors';

@Injectable({
  providedIn: 'root',
})
export class CitiesResolver implements Resolve<any> {
  constructor (
    private store: Store<any>
  ){}

  resolve(route: ActivatedRouteSnapshot): void {
    this.store.select(selectCities)
      .pipe(take(1))
      .subscribe(course => {
        this.store.dispatch(loadCities());
      });
  }
}
