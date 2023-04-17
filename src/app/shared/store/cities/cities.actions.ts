import { createAction, props } from '@ngrx/store';
import {CityModel} from '../../../core/models/city.model';

export const loadCities = createAction(
  '[Cities] Load Cities',
);

export const loadedCities = createAction(
  '[Cities] Loaded Cities Success',
  props<{ citiesList: CityModel[] }>()
);
