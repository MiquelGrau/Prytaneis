import { createReducer, on } from '@ngrx/store';
import { CitiesStateModel } from './cities-state.model';
import {loadCities, loadedCities} from './cities.actions';

export const initialState: CitiesStateModel = new CitiesStateModel(false, [], null);

export const CitiesReducer = createReducer(
  initialState,
  on(loadCities, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedCities, (state, { cities }) => {
    return { ...state, loading: false, citiesList: cities };
  }),
);
