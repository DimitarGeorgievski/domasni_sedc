import { Module } from '@nestjs/common';
import { MovieAwardsService } from './movie-awards.service';
import { MovieAwardsController } from './movie-awards.controller';
import { movieAwards } from './entities/movie-awards.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([movieAwards])],
  controllers: [MovieAwardsController],
  providers: [MovieAwardsService],
})
export class MovieAwardsModule {}
