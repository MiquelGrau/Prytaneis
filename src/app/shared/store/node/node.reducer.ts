import { createReducer, on } from '@ngrx/store';
import { loadAllNodes, loadedAllNodes, loadedNode, loadNode } from './node.actions';
import { IWorldMapNode } from '../../models/world-map-settings.model';

export const nodeFeature = 'node';

export interface NodeState {
  node: IWorldMapNode | null;
  allNodes: IWorldMapNode[] | [];
  loading: boolean;
  error: any;
}

export const initialState: NodeState = {
  node: null,
  allNodes: [],
  loading: false,
  error: null,
};

export const nodeReducer = createReducer(
  initialState,
  on(loadNode, state => ({ ...state, loading: true, error: null })),
  on(loadedNode, (state, { node }) => ({ ...state, node, loading: false, error: null, })),
  on(loadAllNodes, (state) => ({ ...state, loading: true, error: null, })),
  on(loadedAllNodes, (state, { allNodes }) => ({ ...state, allNodes, loading: false, error: null, })),
);

