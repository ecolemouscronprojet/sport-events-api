import { Transform, Type } from 'class-transformer';
import { IsDate, IsDefined, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { EventType } from 'src/database/models/event.entity';
import { CreateAddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {

  @IsNotEmpty()
  @ApiProperty()
  label: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  date: Date

  @IsNotEmpty()
  @IsEnum(EventType)
  @ApiProperty()
  type: EventType;

  @IsDefined({ message: 'Address is required' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty()
  address: CreateAddressDto;

}
