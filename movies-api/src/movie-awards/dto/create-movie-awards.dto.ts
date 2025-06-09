import { IsInt } from "class-validator";

export class CreateMovieAwardDto {
  @IsInt()
  movieId: number;
  @IsInt()
  awardId: number;
}
