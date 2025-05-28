import { IsEmail, IsEnum, IsNumber, IsString, Length, Min } from "class-validator";
import { roleEnum } from "src/auth/enums/role-enum";

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @Length(5, 30)
  password: string;
  @IsString()
  @Length(3, 30)
  firstName: string;
  @IsString()
  @Length(3, 30)
  lastName: string;
  @IsNumber()
  @Min(18)
  age: number;
}
