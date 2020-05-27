import React, { useState, useEffect, ReactChild, ReactChildren } from "react";
import { RecipeDetail } from "./RecipeDetail";
import { EmptyMessage } from "./ResultEmptyMessage";
import { AddRecipe } from "./AddRecipe";

export interface AllRecipesResponse {
  data: Recipe[];
}

export interface Recipe {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  cookingInstructions: string;
  rating: number;
  author: string;
  servingSize: number;
}

var showRecipeDetailsButton : any;
var recipeDetailId: number = 0;
  

export const Dashboard = () => {
  const [recipes, setRecipes] = useState<AllRecipesResponse | null>(null);
  const fetchRecipes = async () => {
    const recipeRequest = await fetch("http://localhost:3000/api/recipe");
    const recipeJson = (await recipeRequest.json()) as AllRecipesResponse;
    setRecipes(recipeJson);
  };
  
  const [showUseEffect, setShowUseEffect] = useState(true);
  
  useEffect(() => {
    fetchRecipes();
  }, []);

  if(recipes === null){
    return <EmptyMessage>Es wurden keine Rezepte gefunden</EmptyMessage>;
  }

  
showRecipeDetailsButton = <button className="recipeDetailsButton" name={recipeDetailId.toString()} onClick={(e) => {setShowUseEffect(!showUseEffect); recipeDetailId = e.currentTarget.parentElement?.className as any as number}}>Rezept öffnen</button>
  var recipeObjects : any[] = [];
  recipes.data.forEach(recipe => {
    recipeObjects.push(<GenerateRecipe recipe={recipe} detailsBtn={showRecipeDetailsButton} setState={fetchRecipes}></GenerateRecipe>);
  });

  return <>{(showUseEffect && <><GenerateRecipeList>{recipeObjects}</GenerateRecipeList><AddRecipe></AddRecipe></>) || (!showUseEffect && <RecipeDetail setState={setShowUseEffect} recipeId={recipeDetailId}/>)}</>;

};

const GenerateRecipeList : React.FC<{}> = ({children}) => {
  return <section className="recipeContainer">{children}</section>
}

const GenerateRecipe : React.FC<{recipe : Recipe, detailsBtn : any, setState: Function}> = ({children, recipe, detailsBtn, setState}) => {
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
  <section className="recipeButtons"><section className={recipe.id.toString()}><button className={recipe.id.toString()} onClick={(e) => {deleteRecipe(recipe.id)}}>Dieses Rezept löschen</button>
  {detailsBtn}</section></section>
  </section>
}

async function deleteRecipe(recipeId: number){
  const requestOptions = {
    method: 'DELETE'
  }
  await fetch("http://localhost:3000/api/recipe/" + recipeId, requestOptions).then(response => response.json());
}