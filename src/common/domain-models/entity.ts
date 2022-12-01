import { Identity } from './identity';

export interface IEntity {
  get id(): Identity;
  get createdAt(): Date;
  get updatedAt(): Date;
}

export abstract class Entity implements IEntity {
  protected _id: Identity;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  public get id(): Identity {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
