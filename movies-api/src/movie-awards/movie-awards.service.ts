import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { movieAwards } from './entities/movie-awards.entity';
import { CreateMovieAwardDto } from './dto/create-movie-awards.dto';
import { UpdateMovieAwardDto } from './dto/update-movie-awards.dto';

@Injectable()
export class MovieAwardsService {
  constructor(
    @InjectRepository(movieAwards)
    private movieAwardRepo: Repository<movieAwards>,
  ) {}

  create(data: CreateMovieAwardDto) {
    try {
      const newMovieAward = this.movieAwardRepo.create(data);
      return this.movieAwardRepo.insert(newMovieAward);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Couldn't create cast member");
    }
  }

  findAll() {
    return `This action returns all castMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} castMember`;
  }

  update(id: number, data: UpdateMovieAwardDto) {
    return `This action updates a #${id} castMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} castMember`;
  }
}
