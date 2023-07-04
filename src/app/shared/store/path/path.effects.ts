import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadAllPaths, loadedAllPaths, loadAllPathsError,
} from './path.actions';
import { PathService } from '../../../core/services/path.service';
import { WorldMapPath } from '../../models/world-map-settings.model';

@Injectable()
export class PathEffects {
  constructor(
    private actions$: Actions,
    private pathService: PathService
  ) {}

  loadAllPaths$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllPaths),
      switchMap(() =>
        this.pathService.getPaths().pipe(
          map(paths => paths.map((json: any) => WorldMapPath.fromJson(json))),
          map(allPaths => loadedAllPaths({ allPaths })),
          catchError(error => of(loadAllPathsError({ error })))
        )
      )
    )
  );


}
