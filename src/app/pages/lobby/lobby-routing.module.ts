import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LobbyComponent } from './lobby.component';
import { AllNodesResolver, AllPathsResolver } from '../../core/resolvers/lobby.resolver';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
    resolve: { allPaths: AllPathsResolver, allNodes: AllNodesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
