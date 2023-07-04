export interface IWorldMapMarker {
  latitude: number;
  longitude: number;
}

export class WorldMapMarker implements IWorldMapMarker {
  constructor(
    public latitude: number = 0,
    public longitude: number = 0,
  ) {}
}

export interface IWorldMapNode {
  id: string;
  cityId: string;
  marker: IWorldMapMarker;
  name: string;
  regionId: string;
  isSuperNode: boolean;
  connectionsId: string[];
  nodeType: string;
}

export class WorldMapNode implements IWorldMapNode {
  constructor(
    public id: string,
    public cityId: string,
    public marker: IWorldMapMarker,
    public name: string = '',
    public regionId: string = '',
    public nodeType: string = '',
    public isSuperNode: boolean = false,
    public connectionsId: string[],
  ) {}

  static fromJson(json: any): IWorldMapNode {
    const marker = new WorldMapMarker(json.latitude, json.longitude);
    return new WorldMapNode(
      json.id || '',
      json.cityId || '',
      marker,
      json.name || '',
      json.regionId || '',
      json.nodeType || '',
      json.isSuperNode || false,
      json.connectionsId || []
    );
  }
}

export interface IWorldMapPath {
  id: string;
  startNodeId: string;
  endNodeId: string;
  speed: number;
  direction: string;
  maxDraft: number;
  minFreeboard: number;
  path: IWorldMapMarker[];
}

export class WorldMapPath implements IWorldMapPath {
  constructor(
    public id: string = '',
    public startNodeId: string = '',
    public endNodeId: string = '',
    public speed: number = 0,
    public direction: string = '',
    public maxDraft: number = 0,
    public minFreeboard: number = 0,
    public path: IWorldMapMarker[] = []
  ) {}

  static fromJson(json: any): WorldMapPath {
    return new WorldMapPath(
      json.id || '',
      json.startNodeId || '',
      json.endNodeId || '',
      json.speed || 0,
      json.direction || '',
      json.maxDraft || 0,
      json.minFreeboard || 0,
      json.path || []
    );
  }
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

