import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { DirectorsModule } from './directors/directors.module';
import { GenresModule } from './genres/genres.module';
import { ActorsModule } from './actors/actors.module';
import { CastMembersModule } from './cast-members/cast-members.module';
import { AwardsModule } from './awards/awards.module';
import { MovieAwardsModule } from './movie-awards/movie-awards.module';
import { ActorAwardsModule } from './actor-awards/actor-awards.module';
import { ProductionCompaniesModule } from './production-companies/production-companies.module';
import { MovieProductionCompaniesModule } from './movie-production-companies/movie-production-companies.module';
import { MovieRevenuesModule } from './movie-revenues/movie-revenues.module';
import { MovieLocationsModule } from './movie-locations/movie-locations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './user/user.module';
import { UserWatchlistModule } from './user-watchlist/user-watchlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    MoviesModule,
    DirectorsModule,
    GenresModule,
    ActorsModule,
    CastMembersModule,
    AwardsModule,
    MovieAwardsModule,
    ActorAwardsModule,
    ProductionCompaniesModule,
    MovieProductionCompaniesModule,
    MovieRevenuesModule,
    MovieLocationsModule,
    ReviewsModule,
    UserModule,
    UserWatchlistModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
