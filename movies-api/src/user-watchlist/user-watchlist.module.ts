import { Module } from '@nestjs/common';
import { UserWatchlistService } from './user-watchlist.service';
import { UserWatchlistController } from './user-watchlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWatchlist } from './entities/user-watchlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWatchlist])],
  controllers: [UserWatchlistController],
  providers: [UserWatchlistService],
})
export class UserWatchlistModule {}
