import { createAction, props } from '@ngrx/store';
import { IWorldMapPath } from '../../models/world-map-settings.model';

export const loadPath = createAction(
  '[Path] Load Path',
  props<{ pathId: string }>()
);

export const loadedPath = createAction(
  '[Path] Loaded Path',
  props<{ path: IWorldMapPath }>()
);

export const loadPathError = createAction(
  '[Path] Load Path Error',
  props<{ error: any }>()
);

export const loadAllPaths = createAction(
  '[Path] Load All Paths',
);

export const loadedAllPaths = createAction(
  '[Path] Loaded All Paths',
  props<{ allPaths: IWorldMapPath[] }>()
);

export const loadAllPathsError = createAction(
  '[Path] Loaded All Paths Error',
  props<{ error: any }>()
);
