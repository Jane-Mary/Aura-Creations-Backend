import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  number: number;

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
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number; // ID of the user creating the event

  @IsNotEmpty()
  @IsNumber()
  eventPlannerId: number; // ID of the event planner managing the event
}