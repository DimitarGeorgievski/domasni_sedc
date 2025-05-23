import { Schema, model } from "mongoose";
import { difficulty, category, ingredients } from "../util/constants.js";

const recipeSchema = new Schema({
  title: {
    type: String,
    minLength: 5,
    maxLength: 30,
    required: [true, "Title is required"]
},
description: {
    type: String,
    minLength: 20,
    maxLength: 300,
    required: [true, "Description is required"]
},
ingredients: {
    type: [String],
    enum: ingredients,
    required: [true, "Ingredients are required"]
},
instructions: {
    type: [String],
    required: [true, "Instructions are required"],
},
cookingTime: {
    type: Number
},
difficulty: {
    type: String,
    enum: difficulty,
},
isVegetarian: {
    type: Boolean
},
category: {
    type: String,
    enum: category,
},
updatedAt: {
    type: String
}
});

const Recipe = model("recipe", recipeSchema, "Recipes");

export default Recipe;