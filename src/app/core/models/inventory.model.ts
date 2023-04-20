
export interface Goods {
  food: number;
  wood: number;
  iron: number;
  tools: number;
  clothes: number;
}

export class Inventory {
  goods: Goods;

  constructor(goods?: Goods) {
    this.goods = {
      food: goods?.food || 0,
      wood: goods?.wood || 0,
      iron: goods?.iron || 0,
      tools: goods?.tools || 0,
      clothes: goods?.clothes || 0,
    };
  }
}

