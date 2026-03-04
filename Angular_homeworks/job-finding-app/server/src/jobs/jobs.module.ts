import { Global, Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
