import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({
    maxLength: 100,
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@domain.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 20,
    example: 'password',
  })
  @IsString()
  password: string;
}
