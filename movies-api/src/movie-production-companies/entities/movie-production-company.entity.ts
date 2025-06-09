import { Movie } from "src/movies/entities/movie.entity";
import { ProductionCompany } from "src/production-companies/entities/production-company.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("movie_production_companies")
export class MovieProductionCompany {
    @CreateDateColumn({
        name: "created_at"
    })
    createdAt: string;
    @Column({
        name: "investment_amount" 
    })
    investmentAmount: number;
    @PrimaryColumn({
        name: "movie_id"
    })
    movieId: number;
    @PrimaryColumn({
        name: "company_id"
    })
    companyId: number;
    @ManyToOne(() => ProductionCompany, PC => PC.movieProductionCompany)
    @JoinColumn({
        name: "company_id"
    })
    productionCompany: ProductionCompany;
    @ManyToOne(() => Movie, movie => movie.movieProductionCompany)
    @JoinColumn({
        name: "movie_id"
    })
    movie: Movie;
}
