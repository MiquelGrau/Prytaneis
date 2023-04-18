import { createReducer, on } from '@ngrx/store';
import { CityModel } from '../../../core/models/city.model';
import { loadWorldCities, loadedWorldCities } from './world-map.actions';

export const worldMapForFeature = 'worldMap';

export interface WorldMapState {
  cities: CityModel[];
  loading: boolean;
  error: any;
}

export const initialState: WorldMapState = {
  cities: [],
  loading: false,
  error: null,
};

export const worldMapReducer = createReducer(
  initialState,
  on(loadWorldCities, state => ({ ...state, loading: true, error: null })),
  on(loadedWorldCities, (state, { cities }) => ({
    ...state,
    cities,
    loading: false,
    error: null,
  })),
);
