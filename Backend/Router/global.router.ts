import { Router } from 'express';
import { recipeRouter } from './recipe.router';
import { ingredientRouter } from './ingredient.router';
import { ingredientsToRecipeRouter} from './ingredientToRecipe.router';


export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/recipe', recipeRouter);
globalRouter.use('/ingredient', ingredientRouter);
globalRouter.use('/ingredientsToRecipe', ingredientsToRecipeRouter)