import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const DUPLICATE_CODE = '23505';
const INVALID_INPUT_CODE = '22P02';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const User = this.UserRepo.create(createUserDto);
      await this.UserRepo.save(User);
      return User;
    } catch (error) {
      if (error.code === DUPLICATE_CODE) {
        throw new BadRequestException('Email is being taken');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  findAllUsers() {
    return this.UserRepo.find();
  }

  findUser(id: string) {
    try {
      const foundUser = this.UserRepo.findOneByOrFail({ id });
      return foundUser;
    } catch (error) {
      throw new NotFoundException("User doesn't exist");
    }
  }

  async deleteUser(id: string) {
    try {
      const foundUser = await this.findUser(id);
      if (!foundUser) throw new NotFoundException('User does not exists');
      await this.UserRepo.remove(foundUser);
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }
  async saveRefreshToken(id: string, refreshToken: string){
    const user = await this.findUser(id);
    user.refreshTokens.push(refreshToken);
    await this.UserRepo.save(user);
  }
  async removeRefreshToken(id: string, refreshToken: string){
    const user = await this.findUser(id);
    user.refreshTokens.filter(token => token !== refreshToken);
    await this.UserRepo.save(user);
  }
  async updateUser(id:string, data: UpdateUserDto){
      const user = await this.findUser(id);
      if(!user){
        throw new NotFoundException("User doesn't exist");
      }
      Object.assign(user, data);
      await this.UserRepo.save(user);
  }
  async findByEmail(email: string){
    return this.UserRepo.findOneBy({email})
  }
}


