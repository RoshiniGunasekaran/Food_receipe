// server/models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  createdBy: { type: String, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
