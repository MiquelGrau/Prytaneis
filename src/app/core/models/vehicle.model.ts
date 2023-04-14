import { CoordsModel } from "./coords.model";
import { LocationType } from "../enums/location.type";
import { CurrentCityModel } from "./city.model";
import {ulid} from "ulid";

export abstract class VehicleModel {
  id: string;
  name: string;
  position: CoordsModel; // Tuple representing the coordinates of the vehicle
  movementRestrictions: LocationType;
  currentCity: CurrentCityModel | null;

  constructor(name: string, position: CoordsModel, movementRestrictions: LocationType) {
    this.id = ulid();
    this.name = name;
    this.position = position;
    this.movementRestrictions = movementRestrictions;
    this.currentCity = null;
  }

  abstract canMove(locationType: LocationType): boolean;
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
