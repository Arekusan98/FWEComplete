import { Recipe, RecipeRequest } from "./Interfaces/Recipe";
import React, { useState } from "react";

export const EditRecipe : React.FC<{recipe: Recipe, editHandler: Function}> = ({children, recipe, editHandler}) => {
    const [showUseEffect, setShowUseEffect] = useState(false);
    return <>
    <section className="editRecipeFormContainer">
    <button className="editRecipeButton" onClick={() => {
        setShowUseEffect(!showUseEffect);
    }}>Rezept bearbeiten</button>
    {showUseEffect && <EditRecipeInterface recipe={recipe} editHandler={editHandler}/>}
    </section></>;
    }

const EditRecipeInterface : React.FC<{recipe: Recipe, editHandler: Function}> = ({children, recipe, editHandler}) => {
    return <>
    <form className="editRecipeForm">
        <label>Name</label>
        <input type="text" name="name" defaultValue={recipe.name}></input>
        <label>Kochanweisungen</label>
        <input type="textarea" name="instructions" defaultValue={recipe.cookingInstructions}></input>
        <label>Autor</label>
        <input type="text" name="author" defaultValue={recipe.author}></input>
        <label>Bewertung</label>
        <input type="number" name="rating" defaultValue={recipe.rating}></input>
        <label>Portionsgröße</label>
        <input type="number" name="size" defaultValue={recipe.servingSize}></input>
        <button type="button" onClick={(e)=>{updateRecipe(e.currentTarget.parentElement, recipe.id).then(editHandler())}}>Speichern</button>
    </form>
    </>
}


async function updateRecipe(recipeForm :HTMLElement | null, recipeId: number){
    if(recipeForm === null){
        return;
    }

    var jsonRequestBody : RecipeRequest = {
        name: "",
        cookingInstructions: "",
        rating: 0,
        author: "",
        servingSize: 0
    };

    for (let i = 0; i <recipeForm.children.length; i++){
        if(recipeForm.children[i].tagName === "INPUT"){
            let inputElement = recipeForm.children[i] as HTMLInputElement;
            switch(inputElement.name){
                case "name":
                jsonRequestBody.name = inputElement.value;
                    break;
                case "instructions":
                jsonRequestBody.cookingInstructions = inputElement.value;
                    break;
                case "author":
                jsonRequestBody.author = inputElement.value;
                    break;
                case "rating":
                jsonRequestBody.rating = (inputElement.value) as any as number;
                    break; 
                case "size":
                jsonRequestBody.servingSize = inputElement.value as any as number;
                    break;
            }
        }
    }
    await updateRecipeOnDatabase(jsonRequestBody, recipeId);
}

const updateRecipeOnDatabase = async (jsonRequestBody: RecipeRequest, recipeId: number) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(jsonRequestBody)
      }
      await fetch("http://localhost:3000/api/recipe/"+recipeId, requestOptions).then(response => response.json());
}
