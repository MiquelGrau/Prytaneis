export class UserModel {
  constructor(
    public userId: string
  ) {}

  static fromJson(json: any): UserModel {
    return new UserModel(json.userId);
  }
}
