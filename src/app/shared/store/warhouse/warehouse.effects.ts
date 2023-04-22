import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CityService } from '../../../core/services/city.service';
import { updateWarehouseGoods, updateWarehouseGoodsError, updateWarehouseGoodsSuccess } from './warehouse.actions';

@Injectable()
export class WarehouseEffects {
  constructor(
    private actions$: Actions,
    private cityService: CityService
  ) {}

}
