import React, { useState, useEffect } from "react"

export interface RecipeResponse {
    data: Recipe;
}

export interface Recipe {
    id:                  number;
    name:                string;
    createdAt:           Date;
    updatedAt:           Date;
    cookingInstructions: string;
    rating:              number;
    author:              string;
    servingSize:         number;
}

export interface IngredientResponse {
    data: Ingredient[];
}

export interface Ingredient {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl:  string;
}


export const RecipeDetail : React.FC<{recipeId : number}> = ({recipeId}) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
    const fetchIngredients = async () => {
        const ingredientsRequest = await fetch("http://localhost:3000/api/recipe/"+recipeId+"/ingredients");
        const ingredients = (await ingredientsRequest.json()) as IngredientResponse
        setIngredients(ingredients.data);
    }
    const fetchRecipe = async () => {
    const recipeRequest = await fetch("http://localhost:3000/api/recipe/"+recipeId);
    const recipeJson = (await recipeRequest.json()) as RecipeResponse;
    setRecipe(recipeJson.data);
  };

  useEffect(() => {
    fetchRecipe();
    fetchIngredients();
  }, []);

  if(recipe === null){
      return <EmptyMessage></EmptyMessage>
  }
  console.log(ingredients);

  if(ingredients === null){
      return <EmptyMessage/>
  }

    var ingredientObjects : any[] = [];
    ingredients?.forEach(ingredient => {
    ingredientObjects.push(<GenerateIngredient ingredient={ingredient} recipe={recipe}></GenerateIngredient>);
    });

  return <><GenerateRecipe recipe={recipe}>{ingredientObjects}</GenerateRecipe><AddIngredient></AddIngredient></>
    
}

const EmptyMessage : React.FC<{}> = ({children}) => {
    return <div>Es gibt kein Rezept!</div>
}

const GenerateRecipe : React.FC<{recipe : Recipe}> = ({children, recipe}) => {
    return <section className="recipe" id={recipe.id.toString()+"recipe"}>
    <section className="recipeName">Name: </section>
    <section className="recipeNameValue">{recipe.name}</section>
    <section className="recipeInstructions">Anleitung: </section>
    <section className="recipeInstructionsValue">{recipe.cookingInstructions}</section>
    <section className="recipeRating">Bewertung: </section>
    <section className="recipeRatingValue">{recipe.rating}</section>
    <section className="recipeServingSize">Portionsgröße: </section>
    <section className="recipeServingSizeValue">{recipe.servingSize}</section>
    <section className="recipeAuthor">Autor: </section>
    <section className="recipeAuthorValue">{recipe.author}</section>
    {children}
    </section>
  }

const GenerateIngredient : React.FC<{ingredient : Ingredient, recipe: Recipe}> = ({children, ingredient, recipe}) => {
    return <>
    <section className="ingredient" id={ingredient.id.toString()+"ingredient"}>
    <section className="ingredientName">Name: </section>
    <section className="ingredientNameValue">{ingredient.name}</section>
    </section>
    <IngredientAmount ingredientId={ingredient.id} recipeId={recipe.id}></IngredientAmount>
    </>
}

export interface IngredientToRecipeResponse {
    data: IngredientToRecipe[];
}

export interface IngredientToRecipe {
    ingredientToRecipeId: number,
    ingredientId: number,
    recipeId: number,
    amount: string
}


export const IngredientAmount : React.FC<{recipeId : number, ingredientId: number}> = ({recipeId, ingredientId}) => {
    const [ingredientToRecipe, setIngredientToRecipe] = useState<IngredientToRecipe[] | null>(null);
    const fetchIngredientToRecipe = async () => {
        const ingredientToRecipeRequest = await fetch("http://localhost:3000/api/ingredientsToRecipe/recipe/"+recipeId+"/ingredient/"+ingredientId);
        const ingredientsToRecipeResponse = (await ingredientToRecipeRequest.json()) as IngredientToRecipeResponse
        setIngredientToRecipe(ingredientsToRecipeResponse.data);
    }
    
  useEffect(() => {
    fetchIngredientToRecipe();
  }, []);

  if(ingredientToRecipe === null){
    return <EmptyMessage></EmptyMessage>;
  }

  return <><div>{ingredientToRecipe[0].amount}</div></>
  
}

export const AddIngredient = () => {
    const [showUseEffect, setShowUseEffect] = useState(false);
    return <>
    <button onClick={() => {
        setShowUseEffect(!showUseEffect);
    }}>Zutat hinzufügen</button>
    {showUseEffect && <AddIngredientInterface />}
    </>;
    }

export const AddIngredientInterface = () => {
    return <><div>asfadfkasklfkl</div></>
}