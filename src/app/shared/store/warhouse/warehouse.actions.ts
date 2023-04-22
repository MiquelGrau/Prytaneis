import { createAction, props } from '@ngrx/store';
import { GoodsModel } from '../../../core/models/inventory.model';

export const updateWarehouseGoods = createAction(
  '[Warehouse] Update Warehouse Goods',
  props<{ warehouseId: string; goods: Partial<GoodsModel> }>()
);

export const updateWarehouseGoodsSuccess = createAction(
  '[Warehouse] Update Warehouse Goods Success',
);

export const updateWarehouseGoodsError = createAction(
  '[Warehouse] Update Warehouse Goods Error',
  props<{ error: any }>()
);
