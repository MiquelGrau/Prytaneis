import { PlayerModel } from './player.model';
import { CityModel } from './city.model';

export class GameModel {
  constructor(
    public id: string,
    public name: string,
    public players: PlayerModel[],
    public cities: CityModel[]
  ) {}

  static fromJson(json: any): GameModel {
    let players = json.players.map((player: any) => PlayerModel.fromJson(player));
    let cities = json.cities.map((city: any) => CityModel.fromJson(city));
    return new GameModel(json.id, json.name, players, cities);
  }
}
