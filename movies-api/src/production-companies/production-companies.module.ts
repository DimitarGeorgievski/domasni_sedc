import { Module } from '@nestjs/common';
import { ProductionCompaniesService } from './production-companies.service';
import { ProductionCompaniesController } from './production-companies.controller';
import { ProductionCompany } from './entities/production-company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionCompany])],
  controllers: [ProductionCompaniesController],
  providers: [ProductionCompaniesService],
})
export class ProductionCompaniesModule {}
