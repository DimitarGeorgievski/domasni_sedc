import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsUrl, IsNumber, Min, IsArray, ArrayNotEmpty } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  logo: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  industry: string;
  @IsUrl()
  website: string;
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  followers: number;
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  employees: number;
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  description: string[];
}
