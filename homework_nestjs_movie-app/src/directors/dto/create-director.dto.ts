import { IsArray, IsDate, IsNumber, IsString, IsUUID, Length } from "class-validator";

export class CreateDirectorDto {
    @IsString()
    @Length(3,50)
    fullName: string;
    @IsNumber()
    birthYear: number;
    @IsString({
        each: true
    })
    @IsArray()
    @IsUUID("4", { each: true })
    movies: string[]
}
