import { Router } from 'express';
import { createIngredient, getAllIngredients, getIngredientById, updateIngredientById, deleteIngredientById, getIngredientByName } from '../Controller/ingredients.controller';

export const ingredientRouter = Router({ mergeParams: true });

ingredientRouter.post('/', createIngredient);
ingredientRouter.get('/', getAllIngredients);
ingredientRouter.get('/:ingredientId', getIngredientById);
ingredientRouter.get('/name/:ingredientName', getIngredientByName);
ingredientRouter.patch('/:ingredientId', updateIngredientById);
ingredientRouter.delete('/:ingredientId', deleteIngredientById);