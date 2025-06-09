import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieRevenueDto } from './create-movie-revenue.dto';

export class UpdateMovieRevenueDto extends PartialType(CreateMovieRevenueDto) {}
