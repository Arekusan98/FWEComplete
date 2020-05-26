import { Router } from 'express';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipeById, removeRecipeById, addIngredientToRecipe, RemoveIngredientFromRecipe, GetAllIngredientsFromRecipe } from '../Controller/recipe.controller';

export const recipeRouter = Router({ mergeParams: true });

recipeRouter.post('/', createRecipe);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.patch('/:recipeId', updateRecipeById);
recipeRouter.delete('/:recipeId', removeRecipeById);
recipeRouter.post('/:recipeId/ingredients/:ingredientId', addIngredientToRecipe);
recipeRouter.delete('/:recipeId/ingredients/:ingredientId', RemoveIngredientFromRecipe);
recipeRouter.get('/:recipeId/ingredients', GetAllIngredientsFromRecipe);