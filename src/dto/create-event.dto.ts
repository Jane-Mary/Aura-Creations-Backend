import { IsNotEmpty, IsString, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { EventStatus } from 'src/enums/event-status.enum';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  userNumber: string;

  @IsNotEmpty()
  @IsString()
  userPassword: string;

  @IsNotEmpty()
  @IsString()
  theme: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  size:string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsEnum(EventStatus) // Validate against the enum
  status: EventStatus;

  @IsNotEmpty()
  @IsNumber()
  eventPlannerId: number; // ID of the event planner managing the event
}