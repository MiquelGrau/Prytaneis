import { createSelector } from '@ngrx/store';
import { CityState } from './city.reducer';

// Selector to get the city from the city state
export const getCity = createSelector(
  (state: CityState) => state.city,
  (city) => city
);

// Selector to get the loading state from the city state
export const getLoading = createSelector(
  (state: CityState) => state.loading,
  (loading) => loading
);

// Selector to get the error state from the city state
export const getError = createSelector(
  (state: CityState) => state.error,
  (error) => error
);

