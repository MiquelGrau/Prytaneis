import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NodeState } from './node.reducer';

export const selectNodeFeature = createFeatureSelector<NodeState>('node');

// Selector to get the node from the node state
export const getNode = createSelector(
  selectNodeFeature,
  (state: NodeState) => state.node
);

// Selector to get the node from the node state
export const getAllNodes = createSelector(
  selectNodeFeature,
  (state: NodeState) => state.allNodes
);

// Selector to get the loading state from the node state
export const getLoading = createSelector(
  selectNodeFeature,
  (state: NodeState) => state.loading
);

// Selector to get the error state from the node state
export const getError = createSelector(
  selectNodeFeature,
  (state: NodeState) => state.error
);
