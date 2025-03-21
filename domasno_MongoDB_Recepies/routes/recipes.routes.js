import { Router } from "express";
import RecipeController from "../controllers/recipes.controller.js";

const router = Router();
const recipeController = new RecipeController;

router.get("", (req,res) => recipeController.getAll(req,res));
router.get("/vegetarian", (req, res) => recipeController.getVegetarianRecipes(req, res));
router.get("/:id", (req,res) => recipeController.getById(req,res));
router.get("/category/:category", (req,res) => recipeController.getByCategory(req,res));
router.put("/:id", (req,res) => recipeController.update(req,res));
router.delete("/:id", (req,res) => recipeController.deleteById(req,res));
router.delete("/", (req,res) => recipeController.deleteAll(req,res));
router.post("/", (req,res) => recipeController.create(req,res));


export default router;