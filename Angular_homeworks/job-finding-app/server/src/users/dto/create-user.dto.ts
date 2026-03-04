import { IsEnum, IsNumber, IsString, Length } from 'class-validator';

export enum WorkStatus {
  SEARCHING = 'searching',
  EMPLOYED = 'employed',
  UNEMPLOYED = 'unemployed',
}
export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  @Length(8, 30)
  password: string;
  @IsString()
  role: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsEnum(WorkStatus)
  workStatus: WorkStatus;
}
