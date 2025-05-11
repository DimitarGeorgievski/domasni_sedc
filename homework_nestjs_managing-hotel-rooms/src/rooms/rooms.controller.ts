import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Room } from './entities/room.entity';
import { FilterRoomsDto } from './dto/filter-rooms.dto';

@ApiTags('Hotel Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @Get()
  @ApiOperation({ summary: 'endpoint for getting all hotel rooms' })
  @ApiOkResponse({
    type: Room,
  })
  @ApiQuery({
    name: 'filters',
    required: false,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getAll(@Query() filters: FilterRoomsDto) {
    return this.roomsService.getAll(filters);
  }
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Room number (1-999)',
    required: true,
  })
  @ApiOperation({ summary: 'endpoint for getting one hotel room' })
  @ApiOkResponse({
    type: Room,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getById(@Param('id') id: number) {
    return this.roomsService.getById(id);
  }
  @HttpCode(204)
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Room number (1-999)',
    required: true,
  })
  @ApiOperation({ summary: 'endpoint for updating a hotel rooms' })
  @ApiOkResponse({
    type: UpdateRoomDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({
    required: false,
  })
  update(@Param('id') id: number, @Body() body: UpdateRoomDto) {
    return this.roomsService.update(id, body);
  }
  @Post()
  @ApiOperation({ summary: 'endpoint for creating a hotel room' })
  @ApiOkResponse({
    type: Room,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({
    required: false,
  })
  create(@Body() body: CreateRoomDto) {
    return this.roomsService.create(body);
  }
  @HttpCode(204)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Room number (1-999)',
    required: true,
  })
  @ApiOperation({ summary: 'endpoint for deleting one hotel room' })
  @ApiOkResponse({
    type: Room,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  delete(@Param('id') id: number) {
    return this.roomsService.delete(id);
  }
}
