import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { loadCities, loadedCities } from './cities.actions';
import { CitiesService } from '../../../core/services/cities.service';

@Injectable()
export class CitiesEffects {

  constructor(
    private actions$: Actions,
    private citiesService: CitiesService
  ) {}

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCities),
      switchMap(() => this.citiesService.getCities()
        .pipe(
          map(citiesList => (loadedCities({ citiesList: citiesList.data }))),
          catchError(error => of({ type: 'LOAD_CITIES_FAILURE', error }))
        )
      ),
    )
  );
}
