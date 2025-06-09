import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorAwardsService } from './actor-awards.service';
import { CreateActorAwardDto } from './dto/create-actor-award.dto';
import { UpdateActorAwardDto } from './dto/update-actor-award.dto';

@Controller('actor-awards')
export class ActorAwardsController {
  constructor(private readonly actorAwardsService: ActorAwardsService) {}

  @Post()
  create(@Body() createActorAwardDto: CreateActorAwardDto) {
    return this.actorAwardsService.create(createActorAwardDto);
  }

  @Get()
  findAll() {
    return this.actorAwardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorAwardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorAwardDto: UpdateActorAwardDto) {
    return this.actorAwardsService.update(+id, updateActorAwardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorAwardsService.remove(+id);
  }
}
