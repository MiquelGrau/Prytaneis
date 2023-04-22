// market.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MarketState } from './market.reducer';

export const selectMarketFeature = createFeatureSelector<MarketState>('market');

// Selector to get the goods from the market state
export const getGoods = createSelector(
  selectMarketFeature,
  (state: MarketState) => state.goods
);

// Selector to get the loading state for goods from the market state
export const getLoadingGoods = createSelector(
  selectMarketFeature,
  (state: MarketState) => state.loadingGoods
);

// Selector to get the purchase status from the market state
export const getPurchaseStatus = createSelector(
  selectMarketFeature,
  (state: MarketState) => state.purchaseStatus
);

// Selector to get the error state from the market state
export const getError = createSelector(
  selectMarketFeature,
  (state: MarketState) => state.error
);
