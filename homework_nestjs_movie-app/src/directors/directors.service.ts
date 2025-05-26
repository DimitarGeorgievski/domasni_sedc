import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { Repository } from 'typeorm';
import { MoviesService } from 'src/movies/movies.service';

const DUPLICATE_CODE = '23505';
const INVALID_INPUT_CODE = '22P02';
const NOT_EXIST_IN_TABLE = "23503";

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director) private directorRepo: Repository<Director>,
    // @Inject(forwardRef(() => MoviesService))
    // private movieService: MoviesService,
  ) {}
  async create(data: CreateDirectorDto) {
    try {
      const {movies, ...directorData} = data;
      const newDirector = this.directorRepo.create({
        ...directorData,
        movies: movies.map(movieId => ({id: movieId}))
      })
      await this.directorRepo.save(newDirector);
      return newDirector;
    } catch (error) {
      if (error.code === DUPLICATE_CODE) {
        throw new BadRequestException('Director already exists');
      }
      if(error.code === NOT_EXIST_IN_TABLE){
              throw new BadRequestException("Information doesn't exist")
            }
      throw new InternalServerErrorException(error.message);
    }
  }
  findAll() {
    return this.directorRepo.find({});
  }
  async findOne(id: string) {
    try {
      const foundDirector = await this.directorRepo.findOne({
        where: {id: id},
        relations: {
          movies: true
        }
      });
      return foundDirector;
    } catch (error) {
      throw new NotFoundException("Director doesn't exist");
    }
  }
  async update(id: string, data: UpdateDirectorDto) {
    const foundDirector = await this.directorRepo.findOneBy({ id });
    if (!foundDirector) throw new NotFoundException("director doesn't exist");
    const updatedDirector = {
      updated_at: new Date().toISOString(),
      ...data,
    };
    Object.assign(foundDirector, updatedDirector);
    await this.directorRepo.save(foundDirector);
  }
  async remove(id: string) {
    try {
      const foundDirector = await this.directorRepo.findOneBy({ id });
      if (!foundDirector) throw new NotFoundException("Director doesn't exist");
      await this.directorRepo.remove(foundDirector);
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Enter valid informations');
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
