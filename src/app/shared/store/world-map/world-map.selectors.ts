import { createSelector } from '@ngrx/store';
import { WorldMapState } from './world-map.reducer';

// Selector to get the cities from the world map state
export const getCities = createSelector(
  (state: WorldMapState) => state.cities,
  (cities) => cities
);

// Selector to get the loading state from the world map state
export const getLoading = createSelector(
  (state: WorldMapState) => state.loading,
  (loading) => loading
);

// Selector to get the error state from the world map state
export const getError = createSelector(
  (state: WorldMapState) => state.error,
  (error) => error
);
