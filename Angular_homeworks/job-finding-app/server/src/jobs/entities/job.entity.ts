import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum JobWorkType {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn("uuid")
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
    default: false,
  })
  isApplied: boolean;
  @Column()
  createdAt: string;
  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
  @ManyToOne(() => Company, (company) => company.job)
  @JoinColumn({
    name: 'company_id',
  })
  company: Company;
}
