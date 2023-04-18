import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

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
      // this.store.select(selectCity)
      //   .pipe(take(1))
      //   .subscribe(city => {
      //     this.store.dispatch(loadCity({ id: id }));
      //   });
    }
  }
}
