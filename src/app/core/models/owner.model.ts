import { ulid } from 'ulid';

export class OwnerModel {
  constructor(
    public id: string = ulid(),
    public name: string
  ) {}

  static fromJson(json: any): OwnerModel {
    const id = json?.id || ulid();
    const name = json?.name || '';

    return new OwnerModel(id, name);
  }
}
