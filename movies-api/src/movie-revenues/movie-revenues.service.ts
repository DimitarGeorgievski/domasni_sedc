import { Injectable } from '@nestjs/common';
import { CreateMovieRevenueDto } from './dto/create-movie-revenue.dto';
import { UpdateMovieRevenueDto } from './dto/update-movie-revenue.dto';

@Injectable()
export class MovieRevenuesService {
  create(createMovieRevenueDto: CreateMovieRevenueDto) {
    return 'This action adds a new movieRevenue';
  }

  findAll() {
    return `This action returns all movieRevenues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieRevenue`;
  }

  update(id: number, updateMovieRevenueDto: UpdateMovieRevenueDto) {
    return `This action updates a #${id} movieRevenue`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieRevenue`;
  }
}
