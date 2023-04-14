import { VehicleModel } from "./vehicle.model";
import {CoordsModel} from "./coords.model";
import { LocationType } from "../enums/location.type";
import { ulid } from 'ulid'

export class CurrentCityModel {
  id: string;
  name: string;

  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
  }
}

export class CityModel {
  id: string;
  name: string;
  position: CoordsModel; // Tuple representing the coordinates of the city
  locationType: LocationType; // Possible values: "land", "sea", "both"
  vehicles: VehicleModel[];

  constructor(name: string, coordinates: CoordsModel, locationType: LocationType) {
    this.id = ulid();
    this.name = name;
    this.position = coordinates;
    this.locationType = locationType;
    this.vehicles = [];
  }

  addVehicle(vehicle: VehicleModel): void {
    this.vehicles.push(vehicle);
  }

  removeVehicle(vehicle: VehicleModel): void {
    const index = this.vehicles.indexOf(vehicle);
    if (index !== -1) {
      this.vehicles.splice(index, 1);
    }
  }
}
