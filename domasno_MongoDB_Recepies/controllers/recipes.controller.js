import RecipeService from "../service/recipe.service.js";

export default class RecipeController {
  constructor() {
    this.RecipeService = new RecipeService();
  }
  async getAll(req, res) {
    try {
      const filters = {};
      if(req.query.title){
        filters.title = req.query.title;
      }
      if(req.query.difficulty){
        filters.difficulty = req.query.difficulty;
      }
      if(req.query.category){
        filters.category = req.query.category;
      }
      const recipes = await this.RecipeService.getAll(filters);
      res.send(recipes);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async getById(req, res) {
    try {
      const recipe = await this.RecipeService.getById(req.params.id);
      res.send(recipe);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficlty,
        isVegetarian,
        category,
      } = req.body;
      const movieData = { updatedAt: new Date().toISOString() };
      for (const [key, value] of Object.entries({
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficlty,
        isVegetarian,
        category,
      })) {
        if (value) {
          movieData[key] = value;
        }
      }
      const success = await this.RecipeService.update(req.params.id, movieData);
      if (!success) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe successfully updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteById(req, res) {
    try {
      const recipe = await this.RecipeService.deleteById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteAll(req, res) {
    try {
      await this.RecipeService.deleteAll();
      res.json({ message: "All Recipes are deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async create(req, res) {
    try {
      const {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficlty,
        isVegetarian,
        category,
      } = req.body;
      const recipeData = {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficlty,
        isVegetarian,
        category,
        createdAt: new Date().toISOString(),
      };
      const id = await this.RecipeService.create(recipeData);
      res.status(201).json({ id, ...recipeData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getVegetarian(req, res) {
    try {
      const recipes = await this.RecipeService.getVegetarianRecipes();
      console.log(recipes);
      if (!recipes || recipes.length === 0) {
        return res.status(404).json({ message: "Recipes not found" });
      }
      res.send(recipes);
    } catch (error) {
      console.error("Error fetching vegetarian recipes:", error);
      res.status(404).json({ message: error.message });
    }
  }
  async getByCategory(req, res) {
    try {
      const recipes = await this.RecipeService.getRecipeByCategory(req.params.category);
      if (!recipes || recipes.length === 0) {
        return res.status(404).json({ message: "Recipes not found" });
      }
      res.json(recipes);
    } catch (error) {
      
      res.status(404).json({ message: error.message });
    }
  }
}
