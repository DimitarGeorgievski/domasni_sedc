import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID, isUUID, Length, Max, Min } from "class-validator"
import { movieGenre } from "../enums/genre-movies.enum"

export class CreateMovieDto {
    @IsString()
    @Length(3,50)
    title:string
    @IsString()
    @Length(3,250)
    description:string
    @IsNumber()
    @Min(1980)
    release_year:number
    @IsArray()
    @IsEnum(movieGenre,{each: true})
    genres: movieGenre[]
    @IsNumber()
    @Min(0)
    duration:number
    @IsNumber()
    @Min(1)
    @Max(10)
    rating:number
    @IsOptional()
    @IsString()
    poster_url?:string
    @IsUUID("4", {message: "Enter valid id"})
    @IsString()
    director: string
    @IsString({ each: true})
    @IsArray()
    @IsUUID("4", {each: true})
    actors: string[]
}
