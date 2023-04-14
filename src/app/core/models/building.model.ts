import {ulid} from "ulid";

export class BuildingModel {
  id: string;
  name: string;
  address: string;

  constructor(name: string, address: string) {
    this.id = ulid();
    this.name = name;
    this.address = address;
  }
}

export class MarketModel extends BuildingModel {
  // Market-specific properties and methods
}

export class FactoryModel extends BuildingModel {
  // Factory-specific properties and methods
  weeklyProduction: number;

  constructor(name: string, address: string) {
    super(name, address);
    this.weeklyProduction = 2; // 2 tones of iron per week
  }
}

export class TavernModel extends BuildingModel {
  // Tavern-specific properties and methods
}

export class HouseModel extends BuildingModel {
  // House-specific properties and methods
}
