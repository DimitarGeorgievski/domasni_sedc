import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { filterMoviesDto } from './dto/filter-movie.dto';
import { DirectorsService } from 'src/directors/directors.service';
import { ActorsService } from 'src/actors/actors.service';
import { User } from 'src/users/entities/user.entity';

const DUPLICATE_CODE = '23505';
const NOT_EXIST_IN_TABLE = '23503';
const INVALID_INPUT_CODE = '22P02';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    private directorService: DirectorsService,
    private actorService: ActorsService,
  ) {}
  async findAll(filters: filterMoviesDto): Promise<Movie[]> {
    try {
      const {
        genre,
        maxDuration,
        minRating,
        title,
        duration,
        rating,
        release_year,
      } = filters ?? {};
      const query = this.movieRepo.createQueryBuilder('movie');
      if (genre && genre.length > 0) {
        query.andWhere('movie.genres && :genres', { genres: genre });
      }
      if (title) {
        query.andWhere('LOWER(movie.title) LIKE LOWER(:title)', {
          title: `%${title}%`,
        });
      }
      if (maxDuration) {
        query.andWhere('movie.duration <= :maxDuration', { maxDuration });
      }

      if (minRating) {
        query.andWhere('movie.rating >= :minRating', { minRating });
      }
      if (duration?.toUpperCase()) {
        query.addOrderBy('movie.duration', duration);
      }
      if (rating) {
        query.addOrderBy('movie.rating', rating);
      }
      if (release_year) {
        query.addOrderBy('movie.release_year', release_year);
      }
      return await query.getMany();
    } catch (error) {
      console.log(error);
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Enter valid informations');
      }
      throw new InternalServerErrorException(error.code);
    }
  }

  async findOne(id: string) {
    try {
      const movie = await this.movieRepo.findOne({
        where: { id: id },
        relations: {
          director: true,
          actors: true,
        },
      });
      return movie;
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Enter valid informations');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, data: UpdateMovieDto) {
    const movie = await this.movieRepo.findOneBy({ id });
    if (!movie) throw new NotFoundException("Movie doesn't exist");
    const updatedMovie = {
      updated_at: new Date().toISOString(),
      ...data,
    };
    Object.assign(movie, updatedMovie);
    await this.movieRepo.save(movie);
  }
  async remove(id: string) {
    try {
      const movie = await this.movieRepo.findOneBy({ id });
      if (!movie) throw new NotFoundException("Movie doesn't exist");
      await this.movieRepo.remove(movie);
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Enter valid informations');
      }
      throw new InternalServerErrorException(error.message);
    }
  }
  async create(data: CreateMovieDto, userEmail: User["email"]) {
    try {
      const { actors, director, ...movieData } = data;
      const mappedActors = await Promise.all(
        actors.map(async (actorId) => {
          await this.actorService.findOne(actorId);
          return { id: actorId };
        }),
      );
      const foundDirector = await this.directorService.findOne(director);
      if(!foundDirector){
        throw new NotFoundException("director doesn't exist")
      }
      const newMovie = this.movieRepo.create({
        ...movieData,
        director: { id: foundDirector.id },
        actors: mappedActors,
        createdBy: userEmail
      });
      await this.movieRepo.save(newMovie);
      return newMovie;
    } catch (error) {
      console.log(error);
      if (error.code === DUPLICATE_CODE) {
        throw new BadRequestException('Movie already exists');
      }
      if (error.code === NOT_EXIST_IN_TABLE) {
        throw new BadRequestException("Information doesn't exist");
      } // dali ima nekoj drug nacin da se popraj ovaj vid na error, kade ako vnesam uuid sto ne postoj vadi 500 error toest deka ne postoj vo tabelata?
      throw new InternalServerErrorException(error.message);
    }
  }
}
