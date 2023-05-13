// market.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadMarketGoods,
  loadMarketGoodsSuccess,
  loadMarketGoodsError,
  purchaseGoods,
  purchaseGoodsSuccess,
  purchaseGoodsError,
  updateMarketGoods,
} from './market.actions';
import { GoodsModel } from '../../../core/models/inventory.model';

export const marketFeature = 'market';

export interface MarketState {
  goods: Partial<GoodsModel> | null;
  loadingGoods: boolean;
  purchaseStatus: 'idle' | 'loading' | 'success' | 'error';
  error: any;
}

export const initialState: MarketState = {
  goods: null,
  loadingGoods: false,
  purchaseStatus: 'idle',
  error: null,
};

export const marketReducer = createReducer(
  initialState,
  on(loadMarketGoods, state => ({ ...state, loadingGoods: true, error: null })),
  on(loadMarketGoodsSuccess, (state, { goods }) => {
    return {
      ...state,
      goods: goods,
      loadingGoods: false,
      error: null,
    };
  }),
  on(loadMarketGoodsError, (state, { error }) => ({
    ...state,
    loadingGoods: false,
    error,
  })),
  on(purchaseGoods, (state) => ({
    ...state,
    purchaseStatus: 'loading',
    error: null,
  })),
  on(purchaseGoodsSuccess, (state, { goods }) => {
    if (!state.goods) {
      return {
        ...state,
        purchaseStatus: 'success',
        error: null,
      };
    }

    const currentGoods = new GoodsModel(
      state.goods?.food ?? 0,
      state.goods?.wood ?? 0,
      state.goods?.iron ?? 0,
      state.goods?.tools ?? 0,
      state.goods?.clothes ?? 0
    );

    const updatedGoods = currentGoods.subtract(goods);

    return {
      ...state,
      goods: { ...updatedGoods },
      purchaseStatus: 'success',
      error: null,
    };
  }),
  on(purchaseGoodsError, (state, { error }) => ({
    ...state,
    purchaseStatus: 'error',
    error,
  })),
);
