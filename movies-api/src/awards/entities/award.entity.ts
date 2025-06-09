import { ActorAward } from 'src/actor-awards/entities/actor-award.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { movieAwards } from 'src/movie-awards/entities/movie-awards.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity("awards")
export class Award{
  @PrimaryColumn({
    name: 'award_id',
  })
  id: string;
  @Column()
  name: string;
  @Column()
  year: string;
  @Column()
  category: number;
  @Column({
    name: 'award_type',
  })
  awardType: string;
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;
  @OneToMany(() => movieAwards, (movieAwards) => movieAwards.award)
  movieAwards: movieAwards[];
  @OneToMany(() => ActorAward, (actorAward) => actorAward.award)
  actorAward: ActorAward[];
}
