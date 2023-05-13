export class PlayerModel {
  constructor(
    public id: string,
    public userId: string,
    public gameId: string,
  ) {}

  static fromJson(json: any): PlayerModel {
    return new PlayerModel(json.id, json.userId, json.gameId);
  }
}
