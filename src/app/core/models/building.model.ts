import { ulid } from 'ulid';
import { BuildingType } from '../enums/building.type';
import { OwnerModel } from './owner.model';
import { InventoryModel } from './inventory.model';

export abstract class BuildingModel {
  constructor(
    public id: string = ulid(),
    public name: string,
    public owner: OwnerModel,
    public type: BuildingType,
    public address: string
  ) {}
}

export class WarehouseModel extends BuildingModel {
  constructor(
    id: string,
    name: string,
    owner: OwnerModel,
    address: string,
    public capacity: number,
    public inventory: InventoryModel
  ) {
    super(id, name, owner, BuildingType.Warehouse, address);
  }

  static fromJson(json: any): WarehouseModel {
    const inventory = InventoryModel.fromJson(json.inventory?.goods ? json.inventory.goods : {});
    return new WarehouseModel(json.id, json.name, json.owner, json.address, json.capacity, inventory);
  }

}

export class MarketModel extends BuildingModel {
  constructor(
    id: string,
    name: string,
    owner: OwnerModel,
    address: string,
    public transactionFee: number
  ) {
    super(id, name, owner, BuildingType.Market, address);
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
