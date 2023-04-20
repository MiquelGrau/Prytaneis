import { createAction, props } from '@ngrx/store';
import { CityModel } from '../../../core/models/city.model';

export const loadCity = createAction(
  '[City] Load City',
  props<{ cityId: string }>()
);

export const loadedCity = createAction(
  '[City] Loaded City',
  props<{ city: CityModel }>()
);

export const loadCityError = createAction(
  '[City] Load City Error',
  props<{ error: any }>()
);
