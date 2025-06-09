import { PartialType } from '@nestjs/mapped-types';
import { CreateActorAwardDto } from './create-actor-award.dto';

export class UpdateActorAwardDto extends PartialType(CreateActorAwardDto) {}
