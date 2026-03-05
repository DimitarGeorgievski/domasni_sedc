import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  role: string;
  @IsDateString()
  startTime: string;
  @IsDateString()
  endTime: string;
  @IsString()
  @IsNotEmpty()
  company: string;
  @IsString()
  userId: string;
}
