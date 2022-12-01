import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain-models/user';

export class UserDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}
