import { Review } from "src/reviews/entities/review.entity";
import { UserWatchlist } from "src/user-watchlist/entities/user-watchlist.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryColumn({
        name: "user_id"
    })
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @CreateDateColumn({
        name: "created_at"
    })
    createdAt: string;
    @OneToMany(() => Review, review => review.user)
    review: Review[]
    @OneToMany(() => UserWatchlist, userWatchlist => userWatchlist.user)
    userWatchList: UserWatchlist[];
}
