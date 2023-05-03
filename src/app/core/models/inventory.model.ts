
export class InventoryModel {
  goods: GoodsModel;

  constructor(goods?: GoodsModel) {
    this.goods = goods || new GoodsModel();
  }

  static fromJson(json: any): InventoryModel {
    const goods = GoodsModel.fromJson(json);
    return new InventoryModel(goods);
  }

  getGoodsArray(): { key: string; value: number }[] {
    return Object.entries(this.goods).map(([key, value]) => ({ key, value }));
  }

  subtract(goods: GoodsModel): InventoryModel {
    return new InventoryModel(this.goods.subtract(goods));
  }
}

export class GoodsModel {
  food: number;
  wood: number;
  iron: number;
  tools: number;
  clothes: number;

  constructor(food?: number, wood?: number, iron?: number, tools?: number, clothes?: number) {
    this.food = food || 0;
    this.wood = wood || 0;
    this.iron = iron || 0;
    this.tools = tools || 0;
    this.clothes = clothes || 0;
  }

  static fromJson(json: any): GoodsModel {
    console.log(json);
    return new GoodsModel(json.food, json.wood, json.iron, json.tools, json.clothes);
  }

  getGoodsArray(): { key: string; value: number }[] {
    return Object.entries(this).map(([key, value]) => ({ key, value }));
  }

  subtract(goods: Partial<GoodsModel>): GoodsModel {
    return new GoodsModel(
      this.food - (goods.food || 0),
      this.wood - (goods.wood || 0),
      this.iron - (goods.iron || 0),
      this.tools - (goods.tools || 0),
      this.clothes - (goods.clothes || 0)
    );
  }
}
