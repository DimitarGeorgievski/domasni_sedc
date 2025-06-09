import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('movie_locations')
export class MovieLocation {
  @PrimaryColumn({
    name: 'location_id',
  })
  id: number;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column({
    name: 'specific_location',
  })
  specificLocation: string;
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;
  @ManyToOne(() => Movie, (movie) => movie.movieLocations)
  @JoinColumn({
    name: 'movie_id',
  })
  movie: Movie;
}
