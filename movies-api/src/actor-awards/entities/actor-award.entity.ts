import { Actor } from 'src/actors/entities/actor.entity';
import { Award } from 'src/awards/entities/award.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity("actor_awards")
export class ActorAward {
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;
  @PrimaryColumn({
    name: 'actor_id',
  })
  actorId: number;
  @PrimaryColumn({
    name: 'award_id',
  })
  awardId: number;
  @ManyToOne(() => Actor, (actor) => actor.actorAward)
  @JoinColumn({
    name: 'actor_id',
  })
  actor: Actor;
  @ManyToOne(() => Award, (award) => award.actorAward)
  @JoinColumn({
    name: 'award_id',
  })
  award: Award;
}
