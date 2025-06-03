import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { movieGenre } from '../enums/genre-movies.enum';
import { Director } from 'src/directors/entities/director.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    unique: true,
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
    default: 'https://example.com',
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
  // @Exclude()
  @Column({
    type: "varchar"
  })
  createdBy: string;
  @ManyToOne(() => Director, (director) => director.movies) 
  @JoinColumn({
    name: 'director_Id', 
  })
  director: Director;
  @ManyToMany(() => Actor, actor => actor.movies)
  @JoinTable({name: "movie_actors"})
  actors: Actor[]
}
