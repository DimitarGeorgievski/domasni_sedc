import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieLocationDto } from './create-movie-location.dto';

export class UpdateMovieLocationDto extends PartialType(CreateMovieLocationDto) {}
