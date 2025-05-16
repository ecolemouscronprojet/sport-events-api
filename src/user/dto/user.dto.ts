import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserGender, UserRole } from 'src/database/models/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthday: Date
}
