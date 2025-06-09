import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieRevenuesService } from './movie-revenues.service';
import { CreateMovieRevenueDto } from './dto/create-movie-revenue.dto';
import { UpdateMovieRevenueDto } from './dto/update-movie-revenue.dto';

@Controller('movie-revenues')
export class MovieRevenuesController {
  constructor(private readonly movieRevenuesService: MovieRevenuesService) {}

  @Post()
  create(@Body() createMovieRevenueDto: CreateMovieRevenueDto) {
    return this.movieRevenuesService.create(createMovieRevenueDto);
  }

  @Get()
  findAll() {
    return this.movieRevenuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieRevenuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieRevenueDto: UpdateMovieRevenueDto) {
    return this.movieRevenuesService.update(+id, updateMovieRevenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieRevenuesService.remove(+id);
  }
}
