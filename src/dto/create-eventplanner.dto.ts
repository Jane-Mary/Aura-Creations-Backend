import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength
} from 'class-validator';

export class CreatePlannerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  bio?: string;

}
