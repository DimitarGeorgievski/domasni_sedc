import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('user_watchlist')
export class UserWatchlist {
  @PrimaryColumn({
    name: 'user_id',
  })
  userId: number;
  @PrimaryColumn({
    name: 'movie_id',
  })
  movieId: number;
  @ManyToOne(() => User, user => user.userWatchList)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
  @ManyToOne(() => Movie, movie => movie.userWatchList)
  @JoinColumn({
    name: 'movie_id',
  })
  movie: Movie;
  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: string;
  @Column({
    name: "added_date"
  })
  addedDate: string
}
