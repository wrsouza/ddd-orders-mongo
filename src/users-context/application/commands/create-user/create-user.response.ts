import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain-models/user';

export class CreateUserResponse {
  @ApiProperty()
  id: string;

  constructor(user: User) {
    this.id = user.id.value;
  }
}
