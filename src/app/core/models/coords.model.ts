export class CoordsModel {
  constructor(public longitude: number, public latitude: number) {}

  static fromJson(json: any): CoordsModel {
    return new CoordsModel(json.longitude, json.latitude);
  }

  static getRandomCoords(): CoordsModel {
    const x = parseFloat((Math.random() * 180 - 90).toFixed(4));
    const y = parseFloat((Math.random() * 360 - 180).toFixed(4));
    return new CoordsModel(x, y);
  }

  /**
   * Used to get the distance in Km of two coord points
   *
   * @param coord1
   * @param coord2
   */
  static calcDistance(coord1: CoordsModel, coord2: CoordsModel): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(coord2.longitude - coord1.longitude);
    const dLon = this.deg2rad(coord2.latitude - coord1.latitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(coord1.longitude)) *
      Math.cos(this.deg2rad(coord2.longitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
