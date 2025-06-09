import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieLocationsService } from './movie-locations.service';
import { CreateMovieLocationDto } from './dto/create-movie-location.dto';
import { UpdateMovieLocationDto } from './dto/update-movie-location.dto';

@Controller('movie-locations')
export class MovieLocationsController {
  constructor(private readonly movieLocationsService: MovieLocationsService) {}

  @Post()
  create(@Body() createMovieLocationDto: CreateMovieLocationDto) {
    return this.movieLocationsService.create(createMovieLocationDto);
  }

  @Get()
  findAll() {
    return this.movieLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieLocationDto: UpdateMovieLocationDto) {
    return this.movieLocationsService.update(+id, updateMovieLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieLocationsService.remove(+id);
  }
}
