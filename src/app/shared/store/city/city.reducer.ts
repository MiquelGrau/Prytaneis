import { createReducer, on } from '@ngrx/store';
import {
  loadCity,
  loadedCity,
} from './city.actions';
import { CityModel } from '../../../core/models/city.model';

export const cityFeature = 'city';

export interface CityState {
  city: CityModel | null;
  loading: boolean;
  error: any;
}

export const initialState: CityState = {
  city: null,
  loading: false,
  error: null,
};

export const cityReducer = createReducer(
  initialState,
  on(loadCity, state => ({ ...state, loading: true, error: null })),
  on(loadedCity, (state, { city }) => ({ ...state, city, loading: false, error: null, })),
);

