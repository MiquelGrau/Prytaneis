// market.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { GoodsModel } from '../../../core/models/inventory.model';
import { updateWarehouseGoods, updateWarehouseGoodsError, updateWarehouseGoodsSuccess } from './warehouse.actions';

export const warehouseFeature = 'warehouse';

export interface WarehouseState {
  goods: Partial<GoodsModel> | null;
  loadingGoods: boolean;
  purchaseStatus: 'idle' | 'loading' | 'success' | 'error';
  error: any;
}

export const initialState: WarehouseState = {
  goods: null,
  loadingGoods: false,
  purchaseStatus: 'idle',
  error: null,
};

export const warehouseReducer = createReducer(
  initialState,
  on(updateWarehouseGoodsError, (state, { error }) => ({
    ...state,
    error,
  })),
);
