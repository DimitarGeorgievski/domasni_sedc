import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { movieGenre } from '../enums/genre-movies.enum';

export class filterMoviesDto {
  @IsOptional()
  @IsEnum(movieGenre, {each: true})
  genre?: movieGenre[];
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  minRating?: number;
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxDuration?: number;
  @IsString()
  @IsOptional()
  @Length(3, 50)
  title?: string;
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  release_year?: 'ASC' | 'DESC';
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  rating?: 'ASC' | 'DESC';
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  duration?: 'ASC' | 'DESC';
}
