import { Module } from '@nestjs/common';
import { MovieRevenuesService } from './movie-revenues.service';
import { MovieRevenuesController } from './movie-revenues.controller';
import { MovieRevenue } from './entities/movie-revenue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRevenue])],
  controllers: [MovieRevenuesController],
  providers: [MovieRevenuesService],
})
export class MovieRevenuesModule {}
