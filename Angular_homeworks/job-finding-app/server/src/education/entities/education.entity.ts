import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Education {
    @Column()
    id: string;
    @ManyToOne(() => User,(user) => user.educations)
    @JoinColumn({
        name: "user_id"
    })
    user: User; 
}
