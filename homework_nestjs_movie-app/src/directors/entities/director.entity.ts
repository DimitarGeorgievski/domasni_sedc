import { Movie } from 'src/movies/entities/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
  })
  fullName: string;
  @Column({
    type: 'int',
  })
  birthYear: number;
  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
