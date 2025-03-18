import { Router } from "express";
import MovieController from "../controller/movie.controller.js";

const router = Router();
const movieController = new MovieController();

router.get("/", (req,res) => movieController.getAll(req,res));
router.get("/:id", (req,res) => movieController.getById(req,res));
router.delete("/:id", (req,res) => movieController.deleteById(req,res));
router.delete("/", (req,res) => movieController.deleteAll(req,res));
router.put("/:id", (req,res) => movieController.updateMovie(req,res));
router.post("/", (req,res) => movieController.addMovie(req,res));

export default router;