import { ulid } from 'ulid';
import { BuildingType } from '../enums/building.type';
import { OwnerModel } from './owner.model';

export abstract class BuildingModel {
  id: string;
  name: string;
  owner: OwnerModel;
  type: BuildingType;
  address: string;

  constructor(id: string, name: string, owner: OwnerModel, type: BuildingType, address: string) {
    this.id = id ? id : ulid();
    this.name = name;
    this.owner = owner;
    this.type = type;
    this.address = address;
  }
}

export class WarehouseModel extends BuildingModel {
  capacity: number;

  constructor(id: string, name: string, owner: OwnerModel, address: string, capacity: number) {
    super(id, name, owner, BuildingType.Warehouse, address);
    this.capacity = capacity;
  }

  static fromJson(json: any): WarehouseModel {
    return new WarehouseModel(json.id, json.name, json.owner, json.address, json.capacity);
  }
}

export class MarketModel extends BuildingModel {
  transactionFee: number;

  constructor(id: string, name: string, owner: OwnerModel, address: string, transactionFee: number) {
    super(id, name, owner, BuildingType.Market, address);
    this.transactionFee = transactionFee;
  }

  static fromJson(json: any): MarketModel {
    return new MarketModel(json.id, json.name, json.owner, json.address, json.transactionFee);
  }
}

const buildingConstructorMap: { [type in BuildingType]?: (json: any) => BuildingModel } = {
  [BuildingType.Warehouse]: WarehouseModel.fromJson,
  [BuildingType.Market]: MarketModel.fromJson,
  // Add other building types and their constructors here
};

export function buildingFactory(json: any): BuildingModel {
  const constructorFn = buildingConstructorMap[json.type as BuildingType];
  if (constructorFn) {
    return constructorFn(json);
  } else {
    throw new Error(`Unknown building type: ${json.type}`);
  }
}
