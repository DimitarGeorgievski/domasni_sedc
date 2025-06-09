import { IsInt } from 'class-validator';

export class CreateActorAwardDto {
  @IsInt()
  movieId: number;
  @IsInt()
  awardId: number;
}
