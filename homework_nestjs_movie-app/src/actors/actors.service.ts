import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import { MoviesService } from 'src/movies/movies.service';

const DUPLICATE_CODE = '23505';
const INVALID_INPUT_CODE = '22P02';
const NOT_EXIST_IN_TABLE = '23503';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor) private actorRepo: Repository<Actor>,
    // @Inject(forwardRef(() => MoviesService))
    // private movieService: MoviesService,
  ) {}
  async create(data: CreateActorDto) {
    try {
      const { movies, ...actorData } = data;
      const newActor = this.actorRepo.create({
        ...actorData,
        movies: movies.map((movieId) => ({ id: movieId })),
      });
      await this.actorRepo.save(newActor);
      return newActor;
    } catch (error) {
      if (error.code === DUPLICATE_CODE) {
        throw new BadRequestException('Actor already exists');
      }
      if (error.code === NOT_EXIST_IN_TABLE) {
        throw new BadRequestException("Information doesn't exist");
      }
      throw new InternalServerErrorException(error.message);
    }
  }
  findAll() {
    return this.actorRepo.find({});
  }
  async findOne(id: string) {
    try {
      const foundActor = await this.actorRepo.findOne({
        where: {id: id},
        relations: {
          movies: true
        }
      });
      return foundActor;
    } catch (error) {
      throw new NotFoundException("Actor doesn't exist");
    }
  }
  async update(id: string, data: UpdateActorDto) {
    const foundActor = await this.actorRepo.findOneBy({ id });
    if (!foundActor) throw new NotFoundException("Actor doesn't exist");
    const updatedActor = {
      updated_at: new Date().toISOString(),
      ...data,
    };
    Object.assign(foundActor, updatedActor);
    await this.actorRepo.save(foundActor);
  }
  async remove(id: string) {
    try {
      const foundActor = await this.actorRepo.findOneBy({ id });
      if (!foundActor) throw new NotFoundException("Actor doesn't exist");
      await this.actorRepo.remove(foundActor);
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Enter valid informations');
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
