import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Education {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    role: string;
    @Column({
        name: "start_time"
    })
    startTime: Date;
    @Column({
        name: "end_time"
    })
    endTime: Date;
    @Column()
    company: string;
    @ManyToOne(() => User,(user) => user.educations)
    @JoinColumn({
        name: "user_id"
    })
    user: User; 
}
