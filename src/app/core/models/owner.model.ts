import { ulid } from 'ulid';

export class OwnerModel {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id ? id : ulid();
    this.name = name;
  }

  static fromJson(json: any): OwnerModel {
    const id = json.id;
    const name = json.name;

    return new OwnerModel(id, name);
  }
}
