import { Module } from '@nestjs/common';
import { MovieLocationsService } from './movie-locations.service';
import { MovieLocationsController } from './movie-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieLocation } from './entities/movie-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieLocation])],
  controllers: [MovieLocationsController],
  providers: [MovieLocationsService],
})
export class MovieLocationsModule {}
