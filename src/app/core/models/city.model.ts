import { VehicleModel } from "./vehicle.model";
import { CoordsModel } from "./coords.model";
import { buildingFactory, BuildingModel } from './building.model';
import { LocationType } from "../enums/location.type";

export interface ICurrentVehicleCity {
  id: string;
  name: string;
}

export class CurrentVehicleCityModel implements ICurrentVehicleCity {
  constructor(public id: string, public name: string) {}

  static fromJson(json: any): CurrentVehicleCityModel {
    return new CurrentVehicleCityModel(json.id, json.name);
  }
}

export interface ICity {
  id: string;
  name: string;
  region: string;
  position: CoordsModel;
  locationType: LocationType;
  population: number;
  populationPoor: number;
  populationMid: number;
  populationRich: number;
  vehicles: VehicleModel[];
  buildings: BuildingModel[];
}

export class CityModel implements ICity {
  constructor(
      public id: string,
      public name: string,
      public region: string,
      public position: CoordsModel,
      public locationType: LocationType,
      public population: number,
      public populationPoor: number,
      public populationMid: number,
      public populationRich: number,
      public vehicles: VehicleModel[],
      public buildings: BuildingModel[]
  ) {}

  static fromJson(json: any): CityModel {
    const position = CoordsModel.fromJson(json);
    const vehicles = json.vehicles ? json.vehicles.map((v: any) => VehicleModel.fromJson(v)) : [];
    const buildings = json.buildings ? json.buildings.map((b: any) => buildingFactory(b)) : [];

    const population = json.populationPoor + json.populationMid + json.populationRich;

    return new CityModel(json.id, json.name, json.region, position, json.locationType,
        population, json.populationPoor, json.populationMid, json.populationRich, vehicles, buildings);
  }
}
