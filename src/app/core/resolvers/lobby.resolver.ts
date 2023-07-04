import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAllPaths } from '../../shared/store/path/path.actions';
import { loadAllNodes } from '../../shared/store/node/node.actions';

@Injectable({
  providedIn: 'root',
})
export class AllPathsResolver implements Resolve<any> {
  constructor (
    private store: Store<any>
  ){}

  resolve(route: ActivatedRouteSnapshot): void {
    this.store.dispatch(loadAllPaths());
  }
}

@Injectable({
  providedIn: 'root',
})
export class AllNodesResolver implements Resolve<any> {
  constructor (
    private store: Store<any>
  ){}

  resolve(route: ActivatedRouteSnapshot): void {
    this.store.dispatch(loadAllNodes());
  }
}
