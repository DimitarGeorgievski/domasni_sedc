import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private moviesRepo: Repository<Movie>) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    const queryBuilder = this.moviesRepo
      .createQueryBuilder('movies')
      .select(['movies.id', 'movies.title', 'movies.budget'])
      .offset(5)
      .limit(5);

    return queryBuilder.getMany();
  }

  async findOne(id: number) {
    const foundMovie = await this.moviesRepo.findOne({
      where: { id },
      relations: {
        director: true,
        genres: true,
        castMembers: {
          actor: true,
        },
        movieProductionCompany: {
          productionCompany: true,
        },
        movieLocations: true,
        userWatchList: {
          user: true,
          movie: true,
        },
        review: true,
      },
    });
    if (!foundMovie) throw new NotFoundException('Movie not found');

    return foundMovie;
  }
  async getMetaData() {
    const response = await this.moviesRepo
      .createQueryBuilder('movie')
      .select('COUNT(movie.id)', 'movieCount')
      .addSelect('MAX(movie.budget)', 'maxBudget')
      .addSelect('MIN(movie.budget)', 'minBudget')
      .addSelect('AVG(movie.budget)', 'averageBudget')
      .getRawOne();
    return {
      ...response,
      movieCount: Number(response.movieCount),
      maxBudget: Number(response.maxBudget),
      minBudget: Number(response.minBudget),
      averageBudget: Number(response.averageBudget),
    };
  }
  async getMovieCountByGenre() {
    const response = await this.moviesRepo
      .createQueryBuilder('movie')
      .leftJoin('movie.genres', 'genre')
      .select('genre.id', 'id')
      .addSelect('genre.name', 'name')
      .addSelect('COUNT(movie.id)', 'movieCount')
      .groupBy('genre.id')
      .orderBy('genre.id')
      .getRawMany();

    return response.map((r) => ({ ...r, movieCount: Number(r.movieCount) }));
  }
  async getAllAwardsForMovie(id: number) {
    return this.moviesRepo.findOne({
      where: { id },
      relations: {
        movieAwards: {
          award: true,
        },
      },
    });
  }
  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
