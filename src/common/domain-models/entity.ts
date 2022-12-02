import { Identity } from './identity';

export interface IEntity<DomainId extends Identity> {
  get id(): DomainId;
  get createdAt(): Date;
  get updatedAt(): Date;
}

export abstract class Entity<DomainId extends Identity>
  implements IEntity<DomainId>
{
  protected _id: DomainId;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  public get id(): DomainId {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
