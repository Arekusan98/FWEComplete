"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const express_1 = require("express");
const recipe_controller_1 = require("../Controller/recipe.controller");
exports.recipeRouter = express_1.Router({ mergeParams: true });
exports.recipeRouter.post('/', recipe_controller_1.createRecipe);
exports.recipeRouter.get('/', recipe_controller_1.getAllRecipes);
exports.recipeRouter.get('/:recipeId', recipe_controller_1.getRecipeById);
exports.recipeRouter.patch('/:recipeId', recipe_controller_1.updateRecipeById);
exports.recipeRouter.delete('/:recipeId', recipe_controller_1.removeRecipeById);
exports.recipeRouter.post('/:recipeId/ingredients/:ingredientId', recipe_controller_1.addIngredientToRecipe);
exports.recipeRouter.delete('/:recipeId/ingredients/:ingredientId', recipe_controller_1.RemoveIngredientFromRecipe);
exports.recipeRouter.get('/:recipeId/ingredients', recipe_controller_1.GetAllIngredientsFromRecipe);
//# sourceMappingURL=recipe.router.js.map