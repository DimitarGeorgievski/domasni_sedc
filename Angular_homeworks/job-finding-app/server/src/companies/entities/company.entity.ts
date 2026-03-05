import { Job } from 'src/jobs/entities/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  logo: string;
  @Column()
  address: string;
  @Column()
  industry: string;
  @Column()
  website: string;
  @Column()
  followers: number;
  @Column()
  employees: number;
  @Column('text', { array: true })
  description: string[];
  @OneToMany(() => Job, (job) => job.company)
  job: Job[]
}
