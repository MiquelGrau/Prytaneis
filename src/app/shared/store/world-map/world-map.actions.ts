import { createAction, props } from '@ngrx/store';
import { CityModel } from '../../../core/models/city.model';

export const loadWorldCities = createAction('[World Map] Load World Cities');

export const loadedWorldCities = createAction(
  '[World Map] Loaded World Cities',
  props<{ cities: CityModel[] }>()
);
