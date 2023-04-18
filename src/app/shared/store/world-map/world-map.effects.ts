import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadWorldCities, loadedWorldCities } from './world-map.actions';
import { CitiesService } from '../../../core/services/cities.service';

@Injectable()
export class WorldMapEffects {
  constructor(
    private actions$: Actions,
    private citiesService: CitiesService
  ) {}

  loadWorldCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWorldCities),
      switchMap(() =>
        this.citiesService.getCities().pipe(
          map(cities => loadedWorldCities({ cities })),
          catchError(error => of(error)) // Handle error if any
        )
      )
    )
  );
}
