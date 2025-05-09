import { PartialType } from '@nestjs/swagger';
import { CreatePlayerDto } from './create-player.dtos';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto){};