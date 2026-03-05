import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const newCompany = this.companyRepo.create(createCompanyDto);
    await this.companyRepo.save(newCompany);
  }

  findAll() {
    return this.companyRepo.find({});
  }

  findOne(id: string) {
    try {
      const foundCompany = this.companyRepo.findOneByOrFail({ id });
      return foundCompany;
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const foundCompany = await this.findOne(id);
    Object.assign(foundCompany, updateCompanyDto);
    await this.companyRepo.save(foundCompany);
  }

  async remove(id: string) {
    const foundCompany = await this.findOne(id);
    await this.companyRepo.remove(foundCompany);
  }
}
