import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Ingredient } from "../Entity/Ingredient";

const validateInput = async (name: string, isBeingUpdated: boolean, id: number | null, ingredientRepository:Repository<Ingredient>) => {
  if(name === ""){
    return false;
  }
  if(!isBeingUpdated){
    const ingredient = await ingredientRepository.findOne({
      where:{
          name: name
      }
    });
    if(ingredient !== undefined){
      return false;
    }
  }else{
    const ingredient = await ingredientRepository.findOne({
      where:{
          name: name
      }
    });
    if(ingredient){
      if(ingredient.id != id){
        return false;
      }  
    }
  }
  return true;
}

export const createIngredient = async (req : Request, res : Response) => {
    const {name, imageUrl} = req.body;
    const ingredientRepository = await getRepository(Ingredient);

    const isValid = await validateInput(name, false, null, ingredientRepository);
  if(!isValid){
    return res.status(400).send("The ingredient either already exists or the name was left empty.");
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
      const isValid = await validateInput(name, true, id as unknown as number, ingredientRepository);
      if(!isValid){   
    return res.status(400).send("The ingredient either already exists or the name was left empty.");
   }
    
    const ingredient = await ingredientRepository.findOneOrFail({
        where:{
            id : id
        }
    });

    ingredient.name = name;
    ingredient.imageUrl = imageUrl;
    
    const updatedIngredient = await ingredientRepository.save(ingredient);
    return res.send({data: updatedIngredient});
   
    } catch (error) {
        return res.sendStatus(400);
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

export const getIngredientByName = async (req:Request, res:Response) => {
  const ingredientName = req.params.ingredientName;
  const ingredientRepository = await getRepository(Ingredient);
  const ingredient = await ingredientRepository.findOne({
      where: {
        name : ingredientName,
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