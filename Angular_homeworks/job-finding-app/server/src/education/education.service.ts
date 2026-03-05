import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education) private educationRepo: Repository<Education>,
  ) {}
  async create(createEducationDto: CreateEducationDto) {
    const newEducation = this.educationRepo.create({
      ...createEducationDto,
      user: { id: createEducationDto.userId },
    });
    await this.educationRepo.save(newEducation);
  }

  findAll() {
    return this.educationRepo.find({});
  }

  findOne(id: string) {
    try {
      const foundEducation = this.educationRepo.findOneByOrFail({ id });
      return foundEducation;
    } catch (error) {
      throw new NotFoundException('Education not found');
    }
  }

  async update(id: string, updateEducationDto: UpdateEducationDto) {
    const foundEducation = await this.findOne(id);
    Object.assign(foundEducation, updateEducationDto);
    await this.educationRepo.save(foundEducation);
  }

  async remove(id: string) {
    const foundEducation = await this.findOne(id);
    await this.educationRepo.remove(foundEducation);
  }
}
