import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Recipe } from '../Entity/Recipe';
import { Ingredient } from '../Entity/Ingredient';
import { IngredientToRecipe } from '../Entity/IngredientToRecipe';

const validateInput = async (name: string, cookingInstructions: string, rating: number, isBeingUpdated: boolean, id: number | null, recipeRepository:Repository<Recipe>) => {
  if(name === ""){
    return false;
  }
  if(!isBeingUpdated){
    const recipe = await recipeRepository.findOne({
      where:{
          name: name
      }
    });
    if(recipe !== undefined){
      return false;
    }
  
  }else{
    const recipe = await recipeRepository.findOne({
      where:{
          name: name
      }
    });
    if(recipe?.id != id){
      return false;
    }
  }

  if(rating !== null){
    if(rating < 0 || rating > 11){
      return false;
    }
  }
  if(cookingInstructions === ""){
    return false;
  }
  return true;
}

export const createRecipe = async (req: Request, res: Response) => {
  
  const { name, servingSize, cookingInstructions, author, rating} = req.body;

  const recipeRepository = await getRepository(Recipe);
  const isValid = await validateInput(name, cookingInstructions, rating, false, null, recipeRepository);
  if(!isValid){
    return res.status(400).send("One or more given values were not valid. Name and CookingInstructions are mandatory, rating should be between 1 and 10. The recipe name must not exist yet");
  }

  const newRecipe = new Recipe();
  newRecipe.name = name;
  newRecipe.servingSize = servingSize;
  newRecipe.cookingInstructions = cookingInstructions;
  newRecipe.author = author;
  newRecipe.rating = rating;

  const createdRecipe = await recipeRepository.save(newRecipe);

  return res.send({
    data: createdRecipe,
  });
};

export const getAllRecipes = async (req: Request, res: Response) => {
    const recipeRepository: Repository<Recipe> = await getRepository(Recipe);
    const recipes = await recipeRepository.find();
    console.log(req);
    res.send({data: recipes});
};

export const getRecipeById = async (req: Request, res: Response) => {
    const id = req.params.recipeId;
    const recipeRepository: Repository<Recipe> = await getRepository(Recipe);
    const recipe = await recipeRepository.findOne({where: {id : id}});
    res.send({data:recipe});
};

export const updateRecipeById = async (req: Request, res: Response) => {
  const { name, servingSize, cookingInstructions, author, rating} = req.body;
  const id = req.params.recipeId;
  const recipeRepository = await getRepository(Recipe);
  try {
   
  const isValid = await validateInput(name, cookingInstructions, rating, true, id as unknown as number, recipeRepository);
  if(!isValid){
    return res.status(400).send("One or more given values were not valid. Name and CookingInstructions are mandatory, rating should be between 1 and 10. The recipe name must not exist yet");
  }

  const recipe = await recipeRepository.findOneOrFail({
      where:{
          id : id
      }
  });

  recipe.name = name;
  recipe.servingSize = servingSize;
  recipe.cookingInstructions = cookingInstructions;
  recipe.author = author;
  recipe.rating = rating;
  
  const updatedRecipe = await recipeRepository.save(recipe);
  return res.send({data: updatedRecipe});
 
  } catch (error) {
      return res.sendStatus(400);
  }
};

const getAllIngredientsForRecipe = async (recipeId: number) =>{
  const ingredientToRecipeRepository = await getRepository(IngredientToRecipe);
  const ingredientToRecipe = await ingredientToRecipeRepository.find({where:{recipeId: recipeId}, relations:["ingredient"]});
  if(ingredientToRecipe.length === 0){
    return null;
  }
  var ingredients : Ingredient[] = [];
  for(let i = 0; i < ingredientToRecipe.length; i++){
    ingredients.push(ingredientToRecipe[i].ingredient);
  }
  return ingredients;

}

const removeIngredientFromRecipe = async (recipeId: number, ingredientId: number) => {
  const ingredientToRecipeRepository = await getRepository(IngredientToRecipe);
  const ingredientToRecipe = await ingredientToRecipeRepository.findOneOrFail({where:{recipeId: recipeId, ingredientId: ingredientId}});
  await ingredientToRecipeRepository.delete(ingredientToRecipe);
  return ingredientToRecipe;
}

export const removeRecipeById = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;
  const recipeRepository = await getRepository(Recipe);
  const ingredients = await getAllIngredientsForRecipe(recipeId as unknown as number);
  await ingredients?.forEach(ingredient => {
    removeIngredientFromRecipe(recipeId as unknown as number, ingredient.id);
  });
  try {
  const recipe = await recipeRepository.findOneOrFail({
      where: {
        id : recipeId,
      },
  });  
  if(recipe !== null){
      await recipeRepository.remove(recipe);
  }
  res.send(200);
  } catch (error) {
    console.log(JSON.stringify(error));
      res.sendStatus(400);
  }
};

export const addIngredientToRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;
  const ingredientId = req.params.ingredientId;
  const {amount} = req.body;
  if(!amount){
    return res.status(400).send("Amount is a mandatory attribute");
  }
  const ingredientToRecipeRepository = await getRepository(IngredientToRecipe);
  const ingredientRepository = await getRepository(Ingredient);
  const recipeRepository = await getRepository(Recipe);
  try{
    const recipe = await recipeRepository.findOneOrFail({where:{id:recipeId}});
    const ingredient = await ingredientRepository.findOneOrFail({where:{id:ingredientId}});
    const ingredientToRecipe = await ingredientToRecipeRepository.findOne({where:{recipeId: recipeId, ingredientId: ingredientId}});
    if(!ingredientToRecipe){
      let ingToRec = new IngredientToRecipe();
      ingToRec.amount = amount;
      ingToRec.ingredientId = ingredient.id;
      ingToRec.ingredient = ingredient;
      ingToRec.recipeId = recipe.id;
      ingToRec.recipe = recipe;
      await ingredientToRecipeRepository.save(ingToRec);
      return res.send({
        data:{
          ingredient: ingredient,
          recipe: recipe,
          ingredientToRecipe: ingToRec
        }
      });
    }
    return res.status(400).send("Ingredient is already added");
  } catch (error) {
    return res.status(400).send("Ingredient or recipe does not exist");
  }
};

export const RemoveIngredientFromRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;
  const ingredientId = req.params.ingredientId;
  try{
    const deletedIngredientToRecipe = await removeIngredientFromRecipe(recipeId as unknown as number, ingredientId as unknown as number);
    return res.send({
        data:{
          ingredient: ingredientId,
          recipe: recipeId,
          ingredientToRecipe: deletedIngredientToRecipe
        }
      });    
  } catch (error) {
    return res.status(400).send("Ingredient, recipe or relation between the two does not exist");
  }
};

export const GetAllIngredientsFromRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;
  try{
  const ingredients = await getAllIngredientsForRecipe(recipeId as unknown as number);
  return res.send({data: ingredients});
}
  catch (error) {
    return res.status(400).send("There has been an error");
  }
};