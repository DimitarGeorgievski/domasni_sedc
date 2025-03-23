import Recipe from "../schemas/recipes.schemas.js";
import { ObjectId } from "mongodb";

export default class RecipeService {
  async getAll(filters = {}) {
    const recipes = Recipe.find(filters);
    return recipes;
  }
  async getById(id) {
    const recipe = Recipe.findById({ _id: new ObjectId(id) });
    return recipe;
  }
  async update(id, body) {
    let recipe = await Recipe.findById(id);
    const updateData = { ...recipe, ...body };
    recipe.set(updateData);
    await recipe.save();
    return recipe;
  }
  async deleteById(id) {
    return Recipe.findByIdAndDelete({ _id: new ObjectId(id) });
  }
  async deleteAll() {
    return Recipe.deleteMany();
  }
  async create(body) {
    return await Recipe.create(body);
  }
  async getRecipeByCategory(category) {
    const recipes = Recipe.find({ category: category });
    return recipes;
  }
  async getVegetarianRecipes() {
    const recipes = await Recipe.find({ isVegetarian: true });
    return recipes;
  }
}
