import { Router } from 'express';
import { recipeRouter } from './recipe.router';
import { ingredientRouter } from './ingredient.router';



export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/recipe', recipeRouter);
globalRouter.use('/ingredient', ingredientRouter);