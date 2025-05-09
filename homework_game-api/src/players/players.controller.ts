import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/create-player.dtos';
import { UpdatePlayerDto } from './dtos/update-player.dtos';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Get()
  findAll() {
    return this.playersService.findAll();
  }
  @Get(":id")
  getById(@Param("id") id:string){
    return this.playersService.getById(id);
  }
  @Post()
  create(@Body() createData: CreatePlayerDto) {
    return this.playersService.create(createData);
  }
  @HttpCode(204)
  @Patch(":id")
  update(@Param("id") id:string, @Body() body: UpdatePlayerDto){
    return this.playersService.update(id,body);
  }
  @Delete(":id")
  delete(@Param("id") id: string){
    return this.playersService.delete(id);
  }
}