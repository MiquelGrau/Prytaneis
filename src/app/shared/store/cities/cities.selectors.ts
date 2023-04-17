import { createSelector } from '@ngrx/store';
import { CitiesState } from './cities.state';
import { CitiesStateModel } from './cities-state.model';

export interface CitiesStateT {
  citiesData: CitiesState
}

export const selectCitiesFeature = (state: CitiesStateT) => state.citiesData.data;

export const selectCities = createSelector(
  selectCitiesFeature,
  (state: CitiesStateModel) => state.citiesList
);

export const selectLoading = createSelector(
  selectCitiesFeature,
  (state: CitiesStateModel) => state.loading
);
