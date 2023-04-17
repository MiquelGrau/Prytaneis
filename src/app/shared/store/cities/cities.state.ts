import { ActionReducerMap } from '@ngrx/store';
import { CitiesReducer } from './cities.reducers';
import { CitiesStateModel } from './cities-state.model';

export interface CitiesState {
  data: CitiesStateModel;
}

export const CITIES_REDUCERS: ActionReducerMap<CitiesState> = {
  data: CitiesReducer
};
