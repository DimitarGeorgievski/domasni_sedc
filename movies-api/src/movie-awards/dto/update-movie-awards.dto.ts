import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieAwardDto } from './create-movie-awards.dto';

export class UpdateMovieAwardDto extends PartialType(CreateMovieAwardDto) {}
