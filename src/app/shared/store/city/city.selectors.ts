import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CityState } from './city.reducer';

export const selectCityFeature = createFeatureSelector<CityState>('city');

// Selector to get the city from the city state
export const getCity = createSelector(
  selectCityFeature,
  (state: CityState) => state.city
);

// Selector to get the loading state from the city state
export const getLoading = createSelector(
  selectCityFeature,
  (state: CityState) => state.loading
);

// Selector to get the error state from the city state
export const getError = createSelector(
  selectCityFeature,
  (state: CityState) => state.error
);
