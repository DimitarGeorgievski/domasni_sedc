import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { movieGenre } from '../enums/genre-movies.enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
    type: 'varchar',
  })
  title: string;
  @Column({
    type: 'varchar',
  })
  description: string;
  @Column({
    type: 'int',
  })
  release_year: number;
  @Column({
    enum: movieGenre,
    type: 'enum',
    enumName: "movie_genres",
    array: true,
  })
  genres: movieGenre[];
  @Column({
    type: 'int',
  })
  duration: number;
  @Column({
    type: 'float',
  })
  rating: number;
  @Column({
    type: 'varchar',
    default: 'https://example.com'
  })
  poster_url?: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
