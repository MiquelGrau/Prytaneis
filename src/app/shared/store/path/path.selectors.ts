import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PathState } from './path.reducer';

export const selectPathFeature = createFeatureSelector<PathState>('path');

// Selector to get the path from the path state
export const getPath = createSelector(
  selectPathFeature,
  (state: PathState) => state.path
);

// Selector to get the path from the path state
export const getAllPaths = createSelector(
  selectPathFeature,
  (state: PathState) => state.allPaths
);

// Selector to get the loading state from the path state
export const getLoading = createSelector(
  selectPathFeature,
  (state: PathState) => state.loading
);

// Selector to get the error state from the path state
export const getError = createSelector(
  selectPathFeature,
  (state: PathState) => state.error
);
