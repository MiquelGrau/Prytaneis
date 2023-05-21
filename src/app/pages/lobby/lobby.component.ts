import { Component, OnInit } from '@angular/core';
import {
  IWorldMapMarker, IWorldMapPath, WorldMapCity, WorldMapMarker, WorldMapNode,
  WorldMapSettings
} from 'src/app/shared/models/world-map-settings.model';
import { dijkstraAlgorithm } from '../../shared/utils/worldmap-utils';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  settings: WorldMapSettings = new WorldMapSettings();

  constructor() {}

  ngOnInit() {

    const markers: IWorldMapMarker[] = [
      { lat: 39.2148, lon: 9.1105 }, // Cagliari
      { lat: 36.7432, lon: 3.0860 }, // Algiers
    ];

    const barcelonaMarker = new WorldMapMarker(41.2030, 2.3586);
    const cadizMarker = new WorldMapMarker(36.5106, -6.3109);
    const marseilleMarker = new WorldMapMarker(43.2957, 5.3715);

    const barcelonaNode = new WorldMapNode('barcelonaNode', barcelonaMarker, []);
    const cadizNode = new WorldMapNode('cadizNode', cadizMarker, []);
    const marseilleNode = new WorldMapNode('marseilleNode', marseilleMarker, []);

    const cadizBarcelonaPathObj: IWorldMapPath = {
      id: 'cadizBarcelonaPath',
      nodes: [cadizNode, barcelonaNode],
      path: [
        { lat: 36.2311, lon: -6.5943 },
        { lat: 35.9319, lon: -5.6246 },
        { lat: 36.3932, lon: -4.2653 },
        { lat: 36.5957, lon: -1.7719 },
        { lat: 37.3802, lon: -0.5428 },
        { lat: 38.7523, lon: 0.5603 },
        { lat: 40.4981, lon: 0.9683 },
        { lat: 41.2030, lon: 2.3586 },
      ],
      speed: 1
    };

    const barcelonaMarseillePathObj: IWorldMapPath = {
      id: 'barcelonaMarseillePath',
      nodes: [barcelonaNode, marseilleNode],
      path: [
        { lat: 41.2030, lon: 2.3586 },
        { lat: 41.9475, lon: 3.5367 },
        { lat: 43.0315, lon: 4.2378 },
      ],
      speed: 1
    };

    barcelonaNode.connectionsId.push(cadizBarcelonaPathObj.id, barcelonaMarseillePathObj.id);
    cadizNode.connectionsId.push(cadizBarcelonaPathObj.id);
    marseilleNode.connectionsId.push(barcelonaMarseillePathObj.id);

    const barcelona = new WorldMapCity('barcelona', barcelonaNode.id, barcelonaMarker);
    const cadiz = new WorldMapCity('cadiz', cadizNode.id, cadizMarker);
    const marseille = new WorldMapCity('marseille', marseilleNode.id, marseilleMarker);

    const cities = [barcelona, cadiz, marseille];
    const nodes = [barcelonaNode, cadizNode, marseilleNode];
    const paths = [cadizBarcelonaPathObj, barcelonaMarseillePathObj]

    const shortestPath = dijkstraAlgorithm('cadizNode', 'marseilleNode', nodes, paths);
    console.log(shortestPath);

    this.settings = new WorldMapSettings(cities, nodes, shortestPath);

  }
}
