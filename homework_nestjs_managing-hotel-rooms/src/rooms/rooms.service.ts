import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FilterRoomsDto } from './dto/filter-rooms.dto';
@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) {}
  async getAll(filters?: FilterRoomsDto) {
    const query = this.roomRepo.createQueryBuilder("room");
    if(filters?.isAvailable){
      query.andWhere("room.isAvailable = :isAvailable", {isAvailable: filters.isAvailable});
    }
    if(filters?.maxPrice){
      query.andWhere("room.price <= :maxPrice", {maxPrice: filters.maxPrice});
    }
    if(filters?.minPrice){
      query.andWhere("room.price >= :minPrice", {minPrice: filters.minPrice});
    }
    if(filters?.roomNumber){
      query.andWhere("room.roomNumber = :roomNumber", {roomNumber: filters.roomNumber});
    }
    if(filters?.type){
      query.andWhere("room.type = :type", {type: filters.type});
    }
    return await query.getMany();
  }
  async getById(roomNumber: number) {
    const foundRoom = await this.roomRepo.findOneBy({ roomNumber });
    if (!foundRoom) throw new NotFoundException('Room is not Found');
    return foundRoom;
  }
  async delete(roomNumber: number) {
    const foundRoom = await this.roomRepo.findOneBy({ roomNumber });
    if (!foundRoom) throw new NotFoundException('Room is not Found');
    await this.roomRepo.remove(foundRoom);
  }
  async create(body: CreateRoomDto) {
    const existingRoom = await this.roomRepo.findOneBy({
      roomNumber: body.roomNumber,
    });
    if (existingRoom) throw new BadRequestException('Room already Exists');
    return this.roomRepo.save(body);
  }
  async update(roomNumber: number, body: UpdateRoomDto) {
    const foundRoom = await this.roomRepo.findOneBy({ roomNumber });
    if (!foundRoom) throw new NotFoundException('Room is not Found');
    Object.assign(foundRoom, body);
    this.roomRepo.save(foundRoom);
  }
}
