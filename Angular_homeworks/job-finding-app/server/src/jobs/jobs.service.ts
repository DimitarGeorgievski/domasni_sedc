import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobsRepo: Repository<Job>,
  ) {}
  async create(createJobDto: CreateJobDto) {
    const newJob = this.jobsRepo.create({
      ...createJobDto,
      company: { id: createJobDto.companyId },
      user: { id: createJobDto.userId },
    });
    return this.jobsRepo.save(newJob);
  }

  findAll() {
    return this.jobsRepo.find({});
  }

  async findOne(id: string) {
    try {
      const foundJob = await this.jobsRepo.findOneByOrFail({ id });
      return foundJob;
    } catch (error) {
      throw new NotFoundException('Job not found');
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const foundJob = await this.findOne(id);
    Object.assign(foundJob, updateJobDto);
    await this.jobsRepo.save(foundJob);
  }

  async remove(id: string) {
    const foundJob = await this.findOne(id);
    await this.jobsRepo.remove(foundJob);
  }
}
