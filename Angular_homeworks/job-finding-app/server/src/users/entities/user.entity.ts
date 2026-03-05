import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkStatus } from '../dto/create-user.dto';
import { Education } from 'src/education/entities/education.entity';
import { Job } from 'src/jobs/entities/job.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    name: 'first_name',
  })
  firstName: string;
  @Column({
    name: 'last_name',
  })
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column({
    default: 0
  })
  connections: number;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column({
    enum: WorkStatus,
    name: 'work_status',
  })
  workStatus: WorkStatus;
  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];
  @OneToMany(() => Education, (Education) => Education.user)
  educations: Education[];
  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];
}
