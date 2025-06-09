import { Controller } from '@nestjs/common';
import { MovieAwardsService } from './movie-awards.service';

@Controller('movie-awards')
export class MovieAwardsController {
  constructor(private readonly movieAwardsService: MovieAwardsService) {}
}
