import { createSelector } from '@ngrx/store';
import { CitiesState } from './cities.state';
import {CitiesStateModel} from './cities-state.model';

export const selectCitiesFeature = (state: CitiesState) => state.cities;

export const selectCities = createSelector(
  selectCitiesFeature,
  (state: CitiesStateModel) => state.citiesList
);

export const selectLoading = createSelector(
  selectCitiesFeature,
  (state: CitiesStateModel) => state.loading
);
