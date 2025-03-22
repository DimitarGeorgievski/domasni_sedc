import MovieService from "../services/movie.service.js";

export default class MovieController {
    constructor() {
        this.movieService = new MovieService();
    }
    async getAll(req,res){
        try {
            const movies = await this.movieService.getAll();
            res.json(movies);
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    async getById(req,res){
        try {
            const movie = await this.movieService.getById(req.params.id);
            if(!movie){
               return res.status(404).send({message: "Movie not found"})
            }
            res.json(movie);
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    async deleteById(req,res){
        try {
            const removedMovie = await this.movieService.deleteById(req.params.id)
            if(removedMovie.deletedCount === 0){
                res.status(404).send({message: "Movie not found"})
            }
            res.json(removedMovie);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
    async deleteAll(req,res){
        try {
            const removeAllMovies = await this.movieService.deleteAll();
            res.json({message: `${removeAllMovies.deletedCount} movies deleted`});
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
    async updateMovie(req,res){
        try {
            const bodyMovie = req.body;
            const MovieId = req.params.id;
            // console.log(MovieId);
            const updatedMovie = await this.movieService.updateMovie(MovieId,bodyMovie);
            // console.log(updatedMovie);
            if(updatedMovie.matchedCount === 0){
                return res.status(404).send({message: "Movie not found"});
            }
            res.json(updatedMovie);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
    async addMovie(req,res){
        try {
            const bodyMovie = req.body;
            const result = await this.movieService.addMovie(bodyMovie);
            const newMovie = { _id: result.insertedId, ...req.body}
            res.json(newMovie);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
}