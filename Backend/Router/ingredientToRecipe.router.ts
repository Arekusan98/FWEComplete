import { Router } from 'express';
import { getAmountsForRecipe } from '../Controller/ingredientsToRecipe.controller';

export const ingredientsToRecipeRouter = Router({ mergeParams: true });

ingredientsToRecipeRouter.get('/recipe/:recipeId/ingredient/:ingredientId', getAmountsForRecipe);