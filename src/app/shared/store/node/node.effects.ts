import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadAllNodes, loadedAllNodes, loadAllNodesError,
} from './node.actions';
import { NodeService } from '../../../core/services/node.service';
import { WorldMapNode } from '../../models/world-map-settings.model';

@Injectable()
export class NodeEffects {
  constructor(
    private actions$: Actions,
    private nodeService: NodeService
  ) {}

  loadAllNodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllNodes),
      switchMap(() =>
        this.nodeService.getNodes().pipe(
          map(nodes => nodes.map((json: any) => WorldMapNode.fromJson(json))),
          map(allNodes => loadedAllNodes({ allNodes })),
          catchError(error => of(loadAllNodesError({ error })))
        )
      )
    )
  );


}
