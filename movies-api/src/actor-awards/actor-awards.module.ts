import { Module } from '@nestjs/common';
import { ActorAwardsService } from './actor-awards.service';
import { ActorAwardsController } from './actor-awards.controller';
import { ActorAward } from './entities/actor-award.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActorAward])],
  controllers: [ActorAwardsController],
  providers: [ActorAwardsService],
})
export class ActorAwardsModule {}
