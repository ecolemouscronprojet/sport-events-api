import { Transform, Type } from 'class-transformer';
import { IsDate, IsDefined, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { EventType } from 'src/database/models/event.entity';
import { CreateAddressDto } from './address.dto';

export class CreateEventDto {

  @IsNotEmpty()
  label: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date

  @IsNotEmpty()
  @IsEnum(EventType)
  type: EventType;

  @IsDefined({ message: 'Address is required' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

}
