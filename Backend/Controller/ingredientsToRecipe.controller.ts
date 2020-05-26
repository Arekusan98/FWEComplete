import { Request, Response } from 'express';
import { IngredientToRecipe } from '../Entity/IngredientToRecipe';
import { Repository, getRepository } from 'typeorm';

export const getAmountsForRecipe = async (req: Request, res: Response) => {
    const ingredientId = req.params.ingredientId;
    const recipeId = req.params.recipeId;
    const ingredientToRecipeRepository: Repository<IngredientToRecipe> = await getRepository(IngredientToRecipe);
    const ingredientsToRecipes = await ingredientToRecipeRepository.find({where:{recipeId : recipeId, ingredientId : ingredientId}});
    console.log(req);
    res.send({data: ingredientsToRecipes});
};