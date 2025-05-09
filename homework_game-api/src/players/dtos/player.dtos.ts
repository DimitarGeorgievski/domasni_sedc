import { IsNumber, IsString, Min } from 'class-validator';
import { CreatePlayerDto } from './create-player.dtos';

export class PlayerDto extends CreatePlayerDto {
  @IsString()
  id: string;
  @IsString({each: true})
  skills: string[];
  @IsNumber()
  @Min(1)
  experience: number;
}