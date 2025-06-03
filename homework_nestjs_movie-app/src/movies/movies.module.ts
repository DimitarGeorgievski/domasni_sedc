import { forwardRef, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { DirectorsModule } from 'src/directors/directors.module';
import { ActorsModule } from 'src/actors/actors.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    forwardRef(() => DirectorsModule),
    forwardRef(() => ActorsModule),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
