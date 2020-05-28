import React, { useState } from "react";
import { RecipeRequest } from "./Interfaces/Recipe";

export const AddRecipe = () => {
    const [showUseEffect, setShowUseEffect] = useState(false);
    return <>
    <section className="addRecipeFormContainer">
    <button className="addRecipeButton" onClick={() => {
        setShowUseEffect(!showUseEffect);
    }}>Rezept hinzufügen</button>
    {showUseEffect && <AddNewRecipeInterface />}
    </section></>;
}

const AddNewRecipeInterface = () => {
    return <>
    <form className="addRecipeForm">
        <label>Name</label>
        <input type="text" name="name" required></input>
        <label>Kochanweisungen</label>
        <input type="textarea" name="instructions" required></input>
        <label>Autor</label>
        <input type="text" name="author"></input>
        <label>Bewertung</label>
        <input type="number" name="rating" min="1" max="10" step="1"></input>
        <label>Portionsgröße</label>
        <input type="number" name="size"></input>
        <button type="button" onClick={(e)=>{validateAndSave(e.currentTarget.parentElement)}}>Speichern</button>
    </form>
    </>
}

function validateAndSave(recipeForm :HTMLElement | null){
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
    addRecipeToDatabase(jsonRequestBody);
}

const addRecipeToDatabase = async (jsonRequestBody: RecipeRequest) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(jsonRequestBody)
      }
      await fetch("http://localhost:3000/api/recipe/", requestOptions).then(response => response.json());
}