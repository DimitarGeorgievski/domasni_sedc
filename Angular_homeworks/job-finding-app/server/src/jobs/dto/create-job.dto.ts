import { Type } from 'class-transformer';
import {
  IsDateString,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { JobWorkType } from '../entities/job.entity';

export class CreateJobDto {
  @IsDateString()
  expires: string;
  @IsString()
  @IsNotEmpty()
  position: string;
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  startingSalary: number;
  @IsEnum(JobWorkType)
  workType: JobWorkType;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsString()
  @IsNotEmpty()
  country: string;
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  qualifications: string[];
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  techStack: string[];
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  prefferedSkills: string[];
  userId: string;
  companyId: string;
}
