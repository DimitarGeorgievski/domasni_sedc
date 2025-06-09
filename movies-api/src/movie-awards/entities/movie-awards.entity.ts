import { Award } from 'src/awards/entities/award.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity("movie_awards")
export class movieAwards {
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;
  @PrimaryColumn({
    name: 'movie_id',
  })
  movieId: number;
  @PrimaryColumn({
    name: 'award_id',
  })
  awardId: number;
  @ManyToOne(() => Movie, (movie) => movie.castMembers)
  @JoinColumn({
    name: 'movie_id',
  })
  movie: Movie;
  @ManyToOne(() => Award, award => award.movieAwards)
  @JoinColumn({
    name: "award_id"
  })
  award: Award;
}
