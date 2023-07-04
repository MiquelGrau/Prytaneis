import { createAction, props } from '@ngrx/store';
import { IWorldMapNode } from '../../models/world-map-settings.model';

export const loadNode = createAction(
  '[Node] Load Node',
  props<{ nodeId: string }>()
);

export const loadedNode = createAction(
  '[Node] Loaded Node',
  props<{ node: IWorldMapNode }>()
);

export const loadNodeError = createAction(
  '[Node] Load Node Error',
  props<{ error: any }>()
);

export const loadAllNodes = createAction(
  '[Node] Load All Nodes',
);

export const loadedAllNodes = createAction(
  '[Node] Loaded All Nodes',
  props<{ allNodes: IWorldMapNode[] }>()
);

export const loadAllNodesError = createAction(
  '[Node] Loaded All Nodes Error',
  props<{ error: any }>()
);
