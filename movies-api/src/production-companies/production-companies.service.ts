import { Injectable } from '@nestjs/common';
import { CreateProductionCompanyDto } from './dto/create-production-company.dto';
import { UpdateProductionCompanyDto } from './dto/update-production-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionCompany } from './entities/production-company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionCompaniesService {
  constructor(@InjectRepository(ProductionCompany) private productionCompanyRepo: Repository<ProductionCompany>){}
  create(createProductionCompanyDto: CreateProductionCompanyDto) {
    return 'This action adds a new productionCompany';
  }

  findAll() {
    return this.productionCompanyRepo.find({});
  }

  findOne(id: number) {
    return this.productionCompanyRepo.findOne({
      where: { id },
      relations: {
        movieProductionCompany: {
          movie: true,
          productionCompany: true,
        }
      }
    });
  }

  update(id: number, updateProductionCompanyDto: UpdateProductionCompanyDto) {
    return `This action updates a #${id} productionCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionCompany`;
  }
}
