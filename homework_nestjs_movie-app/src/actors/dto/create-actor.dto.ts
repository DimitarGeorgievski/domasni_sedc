import { IsArray, IsDate, IsInt, IsString, IsUUID, Length } from "class-validator";

export class CreateActorDto {
    @IsString()
    @Length(3,50)
    fullName: string;
    @IsInt()
    birthYear: number;
    @IsString({
        each: true
    })
    @IsArray()
    @IsUUID("4", {each: true})
    movies: string[]
}