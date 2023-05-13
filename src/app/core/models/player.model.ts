import { UserModel } from './user.model';
import { GameModel } from './game.model';

export class PlayerModel {
  constructor(
    public id: string,
    public userId: string,
    public gameId: string,
    public user: UserModel,
    public game: GameModel
  ) {}

  static fromJson(json: any): PlayerModel {
    let user = UserModel.fromJson(json.user);
    let game = GameModel.fromJson(json.game);
    return new PlayerModel(json.id, json.userId, json.gameId, user, game);
  }
}
