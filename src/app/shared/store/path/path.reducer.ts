import { createReducer, on } from '@ngrx/store';
import { loadAllPaths, loadedAllPaths, loadedPath, loadPath } from './path.actions';
import { IWorldMapPath } from '../../models/world-map-settings.model';

export const pathFeature = 'path';

export interface PathState {
  path: IWorldMapPath | null;
  allPaths: IWorldMapPath[] | [];
  loading: boolean;
  error: any;
}

export const initialState: PathState = {
  path: null,
  allPaths: [],
  loading: false,
  error: null,
};

export const pathReducer = createReducer(
  initialState,
  on(loadPath, state => ({ ...state, loading: true, error: null })),
  on(loadedPath, (state, { path }) => ({ ...state, path, loading: false, error: null, })),
  on(loadAllPaths, (state) => ({ ...state, loading: true, error: null, })),
  on(loadedAllPaths, (state, { allPaths }) => ({ ...state, allPaths, loading: false, error: null, })),
);

