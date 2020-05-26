import { Router } from 'express';
import { createIngredient, getAllIngredients, getIngredientById, updateIngredientById, deleteIngredientById } from '../Controller/ingredients.controller';

export const ingredientRouter = Router({ mergeParams: true });

ingredientRouter.post('/', createIngredient);
ingredientRouter.get('/', getAllIngredients);
ingredientRouter.get('/:ingredientId', getIngredientById);
ingredientRouter.patch('/:ingredientId', updateIngredientById);
ingredientRouter.delete('/:ingredientId', deleteIngredientById);