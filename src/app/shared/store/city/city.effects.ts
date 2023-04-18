import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadCity, loadedCity } from './city.actions';
import { CityService } from '../../../core/services/city.service';

@Injectable()
export class CityEffects {
  constructor(
    private actions$: Actions,
    private cityService: CityService
  ) {}

  loadCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCity),
      switchMap(({ cityId }) =>
        this.cityService.getCity(cityId).pipe(
          map(city => loadedCity({ city })),
          catchError(error => of(error)) // Handle error if any
        )
      )
    )
  );
}
