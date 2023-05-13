import { CoordsModel } from "./coords.model";
import { LocationType } from "../enums/location.type";
import { CurrentVehicleCityModel } from "./city.model";

export abstract class VehicleModel {
  constructor(
    public id: string,
    public name: string,
    public position: CoordsModel,
    public movementRestrictions: LocationType,
    public currentCity: CurrentVehicleCityModel | null,
    public type: string
  ) {}

  abstract canMove(locationType: LocationType): boolean;

  static fromJson(json: any): VehicleModel {
    const position = CoordsModel.fromJson(json.position);
    const currentCity = json.currentCity ? CurrentVehicleCityModel.fromJson(json.currentCity) : null;
    if (json.movementRestrictions === LocationType.Sea) {
      return new ShipModel(json.id, json.name, position, json.movementRestrictions, currentCity, json.type);
    }
    if (json.movementRestrictions === LocationType.Land) {
      return new CaravanModel(json.id, json.name, position, json.movementRestrictions, currentCity, json.type);
    }
    return new PersonModel(json.id, json.name, position, json.movementRestrictions, currentCity, json.type);
  }
}

export class ShipModel extends VehicleModel {
  constructor(id: string, name: string, position: CoordsModel, movementRestrictions: LocationType, currentCity: CurrentVehicleCityModel | null, type: string) {
    super(id, name, position, movementRestrictions, currentCity, type);
  }

  canMove(locationType: LocationType): boolean {
    return locationType === LocationType.Sea;
  }
}

export class CaravanModel extends VehicleModel {
  constructor(id: string, name: string, position: CoordsModel, movementRestrictions: LocationType, currentCity: CurrentVehicleCityModel | null, type: string) {
    super(id, name, position, movementRestrictions, currentCity, type);
  }

  canMove(locationType: LocationType): boolean {
    return locationType === LocationType.Land;
  }
}

export class PersonModel extends VehicleModel {
  constructor(id: string, name: string, position: CoordsModel, movementRestrictions: LocationType, currentCity: CurrentVehicleCityModel | null, type: string) {
    super(id, name, position, movementRestrictions, currentCity, type);
  }

  canMove(locationType: LocationType): boolean {
    return true;
  }
}
