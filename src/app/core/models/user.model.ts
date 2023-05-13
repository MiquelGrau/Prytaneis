import { PlayerModel } from './player.model';

export class UserModel {
  constructor(public userId: string, public player: PlayerModel) {}

  static fromJson(json: any): UserModel {
    let player = PlayerModel.fromJson(json.player);
    return new UserModel(json.userId, player);
  }
}
