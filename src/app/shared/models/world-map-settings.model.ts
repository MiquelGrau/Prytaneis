export interface IWorldMapMarker {
  lat: number;
  lon: number;
}

export class WorldMapMarker implements IWorldMapMarker {
  constructor(
    public lat: number,
    public lon: number
  ) {}
}

export interface IWorldMapNode {
  id: string;
  marker: IWorldMapMarker;
  connectionsId: string[];
}

export class WorldMapNode implements IWorldMapNode {
  constructor(
    public id: string,
    public marker: IWorldMapMarker,
    public connectionsId: string[],
  ) {}
}

export interface IWorldMapPath {
  id: string;
  nodes: IWorldMapNode[];
  path: IWorldMapMarker[];
  speed: number;
}

export interface  IWorldMapCity {
  id: string,
  nodeId: string;
  marker: IWorldMapMarker;
}

export class WorldMapCity implements IWorldMapCity {
  constructor(
    public id: string,
    public nodeId: string,
    public marker: IWorldMapMarker
  ) {}
}

export interface IWorldMapSettings {
  cities: IWorldMapCity[];
  nodes: IWorldMapNode[];
  paths: IWorldMapPath[];
}

export class WorldMapSettings implements IWorldMapSettings {
  constructor(
    public cities: IWorldMapCity[] = [],
    public nodes: IWorldMapNode[] = [],
    public paths: IWorldMapPath[] = []
  ) {}
}

