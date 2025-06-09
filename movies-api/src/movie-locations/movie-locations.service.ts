import { Injectable } from '@nestjs/common';
import { CreateMovieLocationDto } from './dto/create-movie-location.dto';
import { UpdateMovieLocationDto } from './dto/update-movie-location.dto';

@Injectable()
export class MovieLocationsService {
  create(createMovieLocationDto: CreateMovieLocationDto) {
    return 'This action adds a new movieLocation';
  }

  findAll() {
    return `This action returns all movieLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieLocation`;
  }

  update(id: number, updateMovieLocationDto: UpdateMovieLocationDto) {
    return `This action updates a #${id} movieLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieLocation`;
  }
}
