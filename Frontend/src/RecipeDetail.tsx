import React, { useState, useEffect } from "react"
import { Ingredient, IngredientResponse } from "./Interfaces/Ingredient";
import { IngredientToRecipeResponse, IngredientToRecipe } from "./Interfaces/IngredientToRecipe";
import { Recipe } from "./Interfaces/Recipe";
import { RecipeResponse } from "./Interfaces/Recipe";
import { EmptyMessage } from "./ResultEmptyMessage";
import { AddIngredient} from "./AddIngredientToRecipe";
import { EditRecipe } from "./EditRecipe";


export const RecipeDetail : React.FC<{recipeId : number, setState: Function}> = ({recipeId, setState}) => {
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
    }

    useEffect(() => {
        fetchRecipe();
        fetchIngredients();
        // eslint-disable-next-line
    }, []);

    if(recipe === null){
        return <EmptyMessage>Kein Rezept gefunden</EmptyMessage>
    }

    if(ingredients === null){
        return <><GenerateRecipe recipe={recipe}><EmptyMessage>Keine Zutaten für dieses Rezept gefunden</EmptyMessage></GenerateRecipe><EditRecipe recipe={recipe} editHandler={fetchRecipe}></EditRecipe><AddIngredient recipeId={recipeId} addHandler={fetchIngredients}/>
        <section><button className="closeRecipe" onClick={() => setState(true)}>Rezept schließen</button></section>
        </>
    }

    var ingredientObjects : any[] = [];

    ingredients?.forEach(ingredient => {
            ingredientObjects.push(<GenerateIngredient ingredient={ingredient} recipe={recipe} deleteHandler={fetchIngredients}></GenerateIngredient>);
            });        
    

    
    return <><EditRecipe recipe={recipe} editHandler={fetchRecipe}></EditRecipe><GenerateRecipe recipe={recipe}>{ingredientObjects}</GenerateRecipe><AddIngredient recipeId={recipeId} addHandler={fetchIngredients}></AddIngredient>
    <section><button className="closeRecipe" onClick={() => setState(true)}>Rezept schließen</button></section>
    
    </>  
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
    <section className="ingredients">{children}</section>
    </section>
  }

const GenerateIngredient : React.FC<{ingredient : Ingredient, recipe: Recipe, deleteHandler: Function}> = ({children, ingredient, recipe, deleteHandler}) => {
    return <>
    <section className="ingredient" id={ingredient.id.toString()+"ingredient"}>
    <section className="ingredientName">Name: </section>
    <section className="ingredientNameValue">{ingredient.name}</section>
    <IngredientAmount ingredientId={ingredient.id} recipeId={recipe.id}></IngredientAmount>
    <button className="deleteIngredientButton" onClick={()=>{deleteIngredientFromRecipe(ingredient.id, recipe.id).then(deleteHandler())}}>Zutat entfernen</button>
    </section>
    </>
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
// eslint-disable-next-line
  }, []);

  if(ingredientToRecipe === null){
    return <EmptyMessage>Die entsprechenden Mengen der Zutaten wurden nicht gefunden</EmptyMessage>;
  }

  return <><section className="ingredientAmount">Menge: </section><section className="ingredientAmountValue">{ingredientToRecipe[0].amount}</section></>
  
}

const deleteIngredientFromRecipe = async (ingredientId: number, recipeId: number) => {
        const requestOptions = {
            method: 'DELETE',
          } 
        await fetch("http://localhost:3000/api/recipe/"+recipeId+"/ingredients/"+ingredientId, requestOptions).then(response => response.json());
}


