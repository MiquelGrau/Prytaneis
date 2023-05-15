export interface WorldMapMarker {
  lat: number;
  lon: number;
}

export interface IWorldMapSettings {
  markers: WorldMapMarker[];
}

export class WorldMapSettings implements IWorldMapSettings {
  constructor(
    public markers: WorldMapMarker[] = [{ lat: 41.390205, lon: 2.154007 }] // Default marker values
  ) {}
}
