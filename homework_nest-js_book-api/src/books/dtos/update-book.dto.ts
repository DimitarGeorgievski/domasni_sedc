import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class UpdateBookDto{
    @IsString()
    @Length(5,50)
    @IsOptional()
    title: string;
    @IsString()
    @Length(5,50)
    author: string;
    @IsNumber()
    @Min(1)
    price: number;
}