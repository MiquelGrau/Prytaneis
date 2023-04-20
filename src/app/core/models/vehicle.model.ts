import { CoordsModel } from "./coords.model";
import { LocationType } from "../enums/location.type";
import { CurrentVehicleCityModel } from "./city.model";
import {ulid} from "ulid";

export abstract class VehicleModel {
  id: string;
  name: string;
  position: CoordsModel; // Tuple representing the coordinates of the vehicle
  movementRestrictions: LocationType;
  currentCity: CurrentVehicleCityModel | null;
  type: string;

  constructor(name: string, position: CoordsModel, movementRestrictions: LocationType) {
    this.id = ulid();
    this.name = name;
    this.position = position;
    this.movementRestrictions = movementRestrictions;
    this.currentCity = null;
    this.type = '';
  }

  abstract canMove(locationType: LocationType): boolean;

  static fromJson(json: any): VehicleModel {
    const name = json.name;
    const position = new CoordsModel(json.position.x, json.position.y);
    if (json.movementRestrictions === LocationType.Sea) {
      return new ShipModel(name, position);
    }
    if (json.movementRestrictions === LocationType.Land) {
      return new CaravanModel(name, position);
    }
    return new PersonModel(name, position);
  }

}

export class ShipModel extends VehicleModel {
  constructor(name: string, position: CoordsModel) {
    super(name, position, LocationType.Sea);
  }

  canMove(locationType: LocationType): boolean {
    return locationType === LocationType.Sea;
  }
}

export class CaravanModel extends VehicleModel {
  constructor(name: string, position: CoordsModel) {
    super(name, position, LocationType.Land);
  }

  canMove(locationType: LocationType): boolean {
    return locationType === LocationType.Land;
  }
}

export class PersonModel extends VehicleModel {
  constructor(name: string, position: CoordsModel) {
    super(name, position, LocationType.Both);
  }

  canMove(locationType: LocationType): boolean {
    return true;
  }
}
