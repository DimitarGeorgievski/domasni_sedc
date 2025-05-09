import { IsNumber, IsString, Length, Min } from "class-validator";

export class CreateSkillDto{
    @IsString()
    @Length(3,30)
    name: string;
    @IsNumber()
    @Min(1)
    damage: number;
    @IsNumber()
    @Min(1)
    heal: number;
    @IsNumber()
    @Min(10)
    manaCost: number;
    @IsString()
    @Length(5,100)
    description: string;
}