import { IsNotEmpty } from 'class-validator';

export class EventRegisterDto {
  @IsNotEmpty()
  eventId: number;
}
