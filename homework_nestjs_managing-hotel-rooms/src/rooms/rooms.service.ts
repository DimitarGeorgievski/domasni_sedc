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
    const filter: any = {};
    if (filters?.roomNumber) {
      filter.roomNumber = Number(filters.roomNumber);
    }
    if (filters?.isAvailable) {
      filter.isAvailable = filters.isAvailable
    }
    // if (filters?.maxPrice) {
    //   filter.maxPrice = filters.maxPrice;
    // }
    // if (filters?.minPrice) {
    //   filter.minPrice = filters.minPrice;
    // } //ne znaev da go napram za so cenite pa ako mozi da mi dadete nekoja nasoka ili slicno nesto
    if (filters?.type) {
      filter.type = filters.type;
    }
    return this.roomRepo.find({where: filter});
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
