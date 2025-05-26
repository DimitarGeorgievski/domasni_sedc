import { Movie } from "src/movies/entities/movie.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actor {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({
        type: "varchar"
    })
    fullName: string;
    @Column({
        type: "int"
    })
    birthYear: number
    @ManyToMany(() => Movie, movie => movie.actors)
    @JoinTable()
    movies: Movie[]
}
