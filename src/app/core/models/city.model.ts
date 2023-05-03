import { ulid } from 'ulid';
import { VehicleModel } from "./vehicle.model";
import { CoordsModel } from "./coords.model";
import { buildingFactory, BuildingModel } from './building.model';
import { LocationType } from "../enums/location.type";

export class CurrentVehicleCityModel {
  id: string;
  name: string;

  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
  }
}

export class CityModel {
  id: string;
  buildings: BuildingModel[];
  locationType: LocationType; // Possible values: "land", "sea", "both"
  name: string;
  region: string;
  population: number;
  position: CoordsModel; // Tuple representing the coordinates of the cities
  vehicles: VehicleModel[];

  constructor(id: string, name: string, region: string, coordinates: CoordsModel,
              locationType: LocationType, population: number, vehicles: VehicleModel[],
              buildings: BuildingModel[]) {
    this.id = id ? id : ulid();
    this.locationType = locationType;
    this.name = name;
    this.region = region;
    this.population = population;
    this.position = coordinates;
    this.vehicles = vehicles;
    this.buildings = buildings;
  }

  static fromJson(json: any): CityModel {
    console.log(json);
    const id = json.id;
    const name = json.name;
    const region = json.region;
    const locationType = json.locationType;
    const population = json.population;
    const position = new CoordsModel(json.positionX, json.positionY);

    const vehicles: VehicleModel[] = [];
    if (json.vehicles && json.vehicles.length > 0) {
      json.vehicles.forEach((vehicleJson: any) => {
        const vehicle = VehicleModel.fromJson(vehicleJson);
        vehicles.push(vehicle);
      });
    }

    const buildings: BuildingModel[] = [];
    if (json.buildings && json.buildings.length > 0) {
      json.buildings.forEach((buildingJson: any) => {
        const building = buildingFactory(buildingJson);
        buildings.push(building);
      });
    }

    return new CityModel(id, name, region, position, locationType, population, vehicles, buildings);
  }
}
