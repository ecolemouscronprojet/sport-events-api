import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  postalCode: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;
}