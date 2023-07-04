import { Component, OnInit } from '@angular/core';
import {
  IWorldMapMarker, IWorldMapPath, WorldMapCity, WorldMapMarker, WorldMapNode,
  WorldMapSettings
} from 'src/app/shared/models/world-map-settings.model';
import { dijkstraAlgorithm } from '../../shared/utils/worldmap-utils';
import { Store } from '@ngrx/store';
import { pathFeature, PathState } from '../../shared/store/path/path.reducer';
import { getAllPaths } from '../../shared/store/path/path.selectors';
import { nodeFeature, NodeState } from '../../shared/store/node/node.reducer';
import { getAllNodes } from '../../shared/store/node/node.selectors';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  settings: WorldMapSettings = new WorldMapSettings();

  constructor(
    private pathStore: Store<{ [pathFeature]: PathState }>,
    private nodeStore: Store<{ [nodeFeature]: NodeState }>,
  ) {
  }

  ngOnInit() {
    this.pathStore.select(getAllPaths).subscribe(paths => {
      console.log('paths =', paths);
      // this.settings.paths = paths;
    });
    this.nodeStore.select(getAllNodes).subscribe(nodes => {
      console.log('nodes =', nodes);
      const settings = new WorldMapSettings();
      settings.nodes = nodes;
      this.settings = { ...this.settings, ...settings };
    });

    // const markers: IWorldMapMarker[] = [
    //   { latitude: 36.7432, longitude: 3.0860 }, // Algiers
    // ];

    // const barcelonaMarker = new WorldMapMarker(41.2030, 2.3586);
    // const cadizMarker = new WorldMapMarker(36.5106, -6.3109);
    // const marseilleMarker = new WorldMapMarker(43.2957, 5.3715);
    // const cagliariMarker = new WorldMapMarker(39.2148, 9.1105);

    // const barcelonaNode = new WorldMapNode('barcelonaNode', barcelonaMarker, []);
    // const cadizNode = new WorldMapNode('cadizNode', cadizMarker, []);
    // const marseilleNode = new WorldMapNode('marseilleNode', marseilleMarker, []);
    // const cagliariNode = new WorldMapNode('cagliariNode', cagliariMarker, []);

    // const cadizBarcelonaPathObj: IWorldMapPath = {
    //   id: 'cadizBarcelonaPath',
    //   nodes: [cadizNode, barcelonaNode],
    //   path: [
    //     { latitude: 36.2311, longitude: -6.5943 },
    //     { latitude: 35.9319, longitude: -5.6246 },
    //     { latitude: 36.3932, longitude: -4.2653 },
    //     { latitude: 36.5957, longitude: -1.7719 },
    //     { latitude: 37.3802, longitude: -0.5428 },
    //     { latitude: 38.7523, longitude: 0.5603 },
    //     { latitude: 40.4981, longitude: 0.9683 },
    //     { latitude: 41.2030, longitude: 2.3586 },
    //   ],
    //   speed: 1
    // };
    //
    // const barcelonaMarseillePathObj: IWorldMapPath = {
    //   id: 'barcelonaMarseillePath',
    //   nodes: [barcelonaNode, marseilleNode],
    //   path: [
    //     { latitude: 41.2030, longitude: 2.3586 },
    //     { latitude: 41.9475, longitude: 3.5367 },
    //     { latitude: 43.0315, longitude: 4.2378 },
    //   ],
    //   speed: 1
    // };
    //
    // const barcelonaCagliariPathObj: IWorldMapPath = {
    //   id: 'barcelonaCagliariPath',
    //   nodes: [barcelonaNode, cagliariNode],
    //   path: [
    //     { latitude: 41.2030, longitude: 2.3586 },
    //     { latitude: 40.1223, longitude: 4.3622 },
    //     { latitude: 38.7159, longitude: 8.3879 },
    //     { latitude: 38.8657, longitude: 9.2587 },
    //   ],
    //   speed: 1
    // };
    //
    // const cagliariBarcelonaPathObj: IWorldMapPath = {
    //   id: 'cagliariBarcelonaPath',
    //   nodes: [barcelonaNode, cagliariNode],
    //   path: [
    //     { latitude: 38.8657, longitude: 9.2587 },
    //     { latitude: 38.7159, longitude: 8.3879 },
    //     { latitude: 40.1223, longitude: 4.3622 },
    //     { latitude: 41.2030, longitude: 2.3586 },
    //   ],
    //   speed: 1
    // };

    // barcelonaNode.connectionsId.push(cadizBarcelonaPathObj.id, barcelonaMarseillePathObj.id, barcelonaCagliariPathObj.id);
    // cadizNode.connectionsId.push(cadizBarcelonaPathObj.id);
    // marseilleNode.connectionsId.push(barcelonaMarseillePathObj.id);
    // cagliariNode.connectionsId.push(cagliariBarcelonaPathObj.id);

    // const barcelona = new WorldMapCity('barcelona', barcelonaNode.id, barcelonaMarker);
    // const cadiz = new WorldMapCity('cadiz', cadizNode.id, cadizMarker);
    // const marseille = new WorldMapCity('marseille', marseilleNode.id, marseilleMarker);
    // const cagliari = new WorldMapCity('cagliari', cagliariNode.id, cagliariMarker);

    // const cities = [barcelona, cadiz, marseille, cagliari];
    // const nodes = [barcelonaNode, cadizNode, marseilleNode, cagliariNode];
    // const paths = [cadizBarcelonaPathObj, barcelonaMarseillePathObj, barcelonaCagliariPathObj, cagliariBarcelonaPathObj]

    // const shortestPath = dijkstraAlgorithm('cagliariNode', 'barcelonaNode', nodes, paths);
    // console.log(shortestPath);
    //
    // this.settings = new WorldMapSettings(cities, nodes, shortestPath);

  }
}
