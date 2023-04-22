// market.actions.ts
import { createAction, props } from '@ngrx/store';
import { GoodsModel } from '../../../core/models/inventory.model';

export const loadMarketGoods = createAction(
  '[Market] Load Market Goods',
  props<{ marketId: string }>()
);

export const loadMarketGoodsSuccess = createAction(
  '[Market] Load Market Goods Success',
  props<{ goods: Partial<GoodsModel> }>()
);

export const loadMarketGoodsError = createAction(
  '[Market] Load Market Goods Error',
  props<{ error: any }>()
);

export const purchaseGoods = createAction(
  '[Market] Purchase Goods',
  props<{ marketId: string; goods: Partial<GoodsModel> }>()
);

export const purchaseGoodsSuccess = createAction(
  '[Market] Purchase Goods Success',
  props<{ marketId: string; goods: Partial<GoodsModel> }>()
);

export const purchaseGoodsError = createAction(
  '[Market] Purchase Goods Error',
  props<{ error: any }>()
);

export const updateMarketGoods = createAction(
  '[Market] Update Market Goods',
  props<{ marketId: string; goods: Partial<GoodsModel> }>()
);

export const updateMarketGoodsSuccess = createAction(
  '[Market] Update Market Goods Success'
);

export const updateMarketGoodsError = createAction(
  '[Market] Update Market Goods Error',
  props<{ error: any }>()
);
