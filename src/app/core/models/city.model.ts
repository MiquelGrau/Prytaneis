import { VehicleModel } from "./vehicle.model";
import { CoordsModel } from "./coords.model";
import { buildingFactory, BuildingModel } from './building.model';
import { LocationType } from "../enums/location.type";

export class CurrentVehicleCityModel {
  constructor(public id: string, public name: string) {}

  static fromJson(json: any): CurrentVehicleCityModel {
    return new CurrentVehicleCityModel(json.id, json.name);
  }
}

export class CityModel {
  constructor(
    public id: string,
    public name: string,
    public region: string,
    public position: CoordsModel,
    public locationType: LocationType,
    public population: number,
    public vehicles: VehicleModel[],
    public buildings: BuildingModel[]
  ) {}

  static fromJson(json: any): CityModel {
    const position = CoordsModel.fromJson(json.position);
    const vehicles = json.vehicles ? json.vehicles.map((v: any) => VehicleModel.fromJson(v)) : [];
    const buildings = json.buildings ? json.buildings.map((b: any) => buildingFactory(b)) : [];

    return new CityModel(json.id, json.name, json.region, position, json.locationType,
      json.population, vehicles, buildings);
  }
}
