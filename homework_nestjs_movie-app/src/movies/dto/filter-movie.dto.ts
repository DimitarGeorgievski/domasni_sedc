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
import { movieGenre, sortOrders } from '../enums/genre-movies.enum';

export class filterMoviesDto {
  @IsOptional()
  @IsEnum(movieGenre, { each: true })
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
  @IsEnum(sortOrders)
  @IsOptional()
  release_year?: sortOrders;
  @IsEnum(sortOrders)
  @IsOptional()
  rating?: sortOrders;
  @IsEnum(sortOrders)
  @IsOptional()
  duration?: sortOrders;
}
