import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { filterMoviesDto } from './dto/filter-movie.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { roleEnum } from 'src/auth/enums/role-enum';
import { RolesGuard } from 'src/auth/role.guard';

@UseGuards(AuthGuard, RolesGuard)
@Roles(roleEnum.ADMIN)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @HttpCode(201)
  
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }
  @HttpCode(200)
  @Roles(roleEnum.USER)
  @Get()
  async findAll(@Query() query: filterMoviesDto) {
    return this.moviesService.findAll(query);
  }
  @HttpCode(200)
  @Roles(roleEnum.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
