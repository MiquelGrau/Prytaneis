import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CityService } from '../../../core/services/city.service';
import { GoodsModel } from '../../../core/models/inventory.model';
import {
  loadMarketGoods, loadMarketGoodsError, loadMarketGoodsSuccess,
  purchaseGoods,
  purchaseGoodsError,
  purchaseGoodsSuccess, updateMarketGoods
} from './market.actions';

@Injectable()
export class MarketEffects {
  constructor(
    private actions$: Actions,
    private cityService: CityService,
  ) {}

  fetchMarketGoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMarketGoods),
      switchMap(({ marketId }) =>
        this.cityService.getMarketGoods(marketId).pipe(
          map(goodsJson => GoodsModel.fromJson(goodsJson)),
          map(goods => {
            return loadMarketGoodsSuccess({ goods });
          }),
          catchError(error => of(loadMarketGoodsError({ error })))
        )
      )
    )
  );

  purchaseGoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchaseGoods),
      switchMap(({ marketId, goods }) =>
        this.cityService.purchaseGoods(marketId, goods).pipe(
          map(() => purchaseGoodsSuccess({ marketId, goods })),
          catchError(error => of(purchaseGoodsError({ error })))
        )
      )
    )
  );

  updateMarketAfterPurchase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchaseGoodsSuccess),
      map(({ marketId, goods }) => updateMarketGoods({ marketId, goods: goods }))
    )
  );
}
