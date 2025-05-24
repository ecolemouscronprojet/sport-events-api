import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserGender, UserRole } from 'src/database/models/user.entity';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  birthday: Date
}
