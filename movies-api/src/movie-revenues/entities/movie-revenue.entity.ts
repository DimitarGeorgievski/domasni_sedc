import { Movie } from 'src/movies/entities/movie.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('movie_revenues')
export class MovieRevenue {
  @PrimaryColumn({
    name: 'movie_id',
  })
  id: number;
  @Column({
    name: 'domestic_revenue',
  })
  domesticRevenue: number;
  @Column({
    name: 'international_revenue',
  })
  internationalRevenue: number;
  @ManyToOne(() => Movie, movie => movie.movieRevenues)
  @JoinColumn({
    name: 'movie_id',
  })
  movie: Movie;
}
