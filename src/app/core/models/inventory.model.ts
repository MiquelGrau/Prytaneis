export class InventoryModel {
  constructor(public goods: GoodsModel = new GoodsModel()) {}

  static fromJson(json: any): InventoryModel {
    const goods = GoodsModel.fromJson(json);
    return new InventoryModel(goods);
  }

  getGoodsArray(): { key: string; value: number }[] {
    return this.goods.getGoodsArray();
  }

  subtract(goods: GoodsModel): InventoryModel {
    return new InventoryModel(this.goods.subtract(goods));
  }
}

export class GoodsModel {
  constructor(
    public food: number = 0,
    public wood: number = 0,
    public iron: number = 0,
    public tools: number = 0,
    public clothes: number = 0
  ) {}

  static fromJson(json: any): GoodsModel {
    return new GoodsModel(json.food || 0, json.wood || 0, json.iron || 0, json.tools || 0, json.clothes || 0);
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
