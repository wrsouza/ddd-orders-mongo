import { Entity } from '../../common/domain-models/entity';
import { UserId } from './user-id';
import { User as UserMongo } from '../../data/database/schemas/user.schema';

export interface IUserValues {
  id?: UserId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _isAdmin: boolean;

  constructor(user: IUserValues) {
    super();
    this._id = user.id;
    this._name = user.name;
    this._email = user.email;
    this._password = user.password;
    this._isAdmin = user.isAdmin;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  update(user: Partial<UserMongo>) {
    if (user.name) {
      this._name = user.name;
    }
    if (user.email) {
      this._email = user.email;
    }
    if (user.password) {
      this._password = user.password;
    }
    if (user.isAdmin) {
      this._isAdmin = user.isAdmin;
    }
  }
}
