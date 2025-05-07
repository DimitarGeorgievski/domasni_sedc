import { IsNumber, IsString, Length, Min } from "class-validator";

export class CreateBookDto{
    @IsString()
    @Length(5,50)
    title: string;
    @IsString()
    @Length(5,50)
    author: string;
    @IsNumber()
    @Min(1)
    price: number;
}