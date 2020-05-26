import React, { useState, useEffect } from "react";

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

export const Dashboard = () => {
  const [recipes, setRecipes] = useState<AllRecipesResponse | null>(null);
  const fetchRecipes = async () => {
    const recipeRequest = await fetch("localhost:3000/api/recipe");
    const recipeJson = (await recipeRequest.json()) as AllRecipesResponse;
    console.log(recipeJson);
    setRecipes(recipeJson);
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  const recipeContainer = <div className="recipeContainer"></div>
  recipes?.data.forEach(recipe => {
    React.createElement(Recipe, recipe);
  });
  return (recipeContainer);
};

const Recipe = (recipe :Recipe) => {
  return <>
  <section className="recipe" id={recipe.id.toString()}>
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
  </section>
  </>
}