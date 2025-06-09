import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryColumn({
    name: 'review_id',
  })
  id: number;
  @ManyToOne(() => Movie, (movie) => movie.review)
  @JoinColumn({
    name: 'movie_id',
  })
  movie: Movie;
  @ManyToOne(() => User, user => user.review)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
  @Column()
  rating: number;
  @Column({
    name: "review_text"
  })
  reviewText: string
  @Column({
    name: "review_date"
  })
  reviewDate: string;
  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: string;
}
