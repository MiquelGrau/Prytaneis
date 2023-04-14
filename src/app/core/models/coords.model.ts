
export class CoordsModel {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static getRandomCoords() {
    const x = parseFloat((Math.random() * 180 - 90).toFixed(4));
    const y = parseFloat((Math.random() * 360 - 180).toFixed(4));
    return new CoordsModel(x, y);
  }
}
