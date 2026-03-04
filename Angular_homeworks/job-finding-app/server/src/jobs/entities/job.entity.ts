import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum JobWorkType {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  expires: string;
  @Column()
  position: string;
  @Column()
  startingSalary: number;
  @Column({ enum: JobWorkType })
  workType: JobWorkType;
  @Column()
  location: string;
  @Column()
  country: string;
  @Column('text', { array: true })
  qualifications: string[];
  @Column()
  description: string;
  @Column('text', { array: true })
  techStack: string[];
  @Column('text', { array: true })
  prefferedSkills: string[];
  @Column({
    default: false
  })
  isApplied: boolean;
  @Column()
  createdAt: string;
  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
}
