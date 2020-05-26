import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Ingredient } from "../Entity/Ingredient";

export const createIngredient = async (req : Request, res : Response) => {
    const {name, imageUrl} = req.body;
    const ingredientRepository = await getRepository(Ingredient);

    const ingredient = await ingredientRepository.findOne({
        where: {
          name,
        },
      });
    
      if (ingredient) {
        return res.status(400).send({
          status: 'This ingredient already exists',
        });
      }

    const newIngredient = new Ingredient();
    newIngredient.name = name;
    newIngredient.imageUrl = imageUrl;

    const createdIngredient = await ingredientRepository.save(newIngredient);

    return res.send({
        data: createdIngredient
    });
};

export const updateIngredientById = async(req : Request, res : Response) =>{
    const {name, imageUrl} = req.body;
    const id = req.params.ingredientId;
    const ingredientRepository = await getRepository(Ingredient);
    try {
     
    const ingredient = await ingredientRepository.findOneOrFail({
        where:{
            id : id
        }
    });

    ingredient.name = name;
    ingredient.imageUrl = imageUrl;
    
    const updatedIngredient = await ingredientRepository.save(ingredient);
    res.send({data: updatedIngredient});
   
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getAllIngredients = async (_:Request, res: Response) => {
    const ingredientRepository = await getRepository(Ingredient);
    const ingredients = await ingredientRepository.find();
    return res.send({data: ingredients});
}

export const getIngredientById = async (req:Request, res:Response) => {
    const ingredientId = req.params.ingredientId;
    const ingredientRepository = await getRepository(Ingredient);
    const ingredient = await ingredientRepository.findOne({
        where: {
          id : ingredientId,
        },
      });
      res.send({data:ingredient});
}

export const deleteIngredientById = async(req:Request, res:Response) => {
    const ingredientId = req.params.ingredientId;
    const ingredientRepository = await getRepository(Ingredient);
    try {
    const ingredient = await ingredientRepository.findOneOrFail({
        where: {
          id : ingredientId,
        },
    });  
    ingredientRepository.remove(ingredient);
    res.send(200);
    } catch (error) {
        res.send(400);
    }
    
}