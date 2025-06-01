import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserAdress } from './models/user-address.model';
import { Model } from 'mongoose';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAdress.name) private userAdressModel: Model<UserAdress>,
  ) {}

  async create(userData: CreateUserAddressDto) {
    const newAddress = new this.userAdressModel(userData);
    const createdAddress = await newAddress.save();
    return createdAddress; 
  }

  findAll() {
    return this.userAdressModel.find({});
  }

  async findOne(id: string) {
    try {
      const foundUserAdress = await this.userAdressModel.findById(id);
      if (!foundUserAdress) throw new Error();
      return foundUserAdress;
    } catch (error) {
      throw new NotFoundException("Address doesn't exist");
    }
  }

  async update(id: string, updateData: UpdateUserAddressDto) {
    const userAdress = await this.findOne(id);
    Object.assign(userAdress, updateData);
    await userAdress.save();
    return userAdress
  }

  async remove(id: string) {
    try {
      const response = await this.userAdressModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new NotFoundException("Address doesn't exist");
    }
  }
}
