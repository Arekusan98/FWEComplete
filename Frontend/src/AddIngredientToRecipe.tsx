import React, { useState } from "react";
import { IngredientRequestBody, FormIngredient, singleIngredientResponse } from "./Interfaces/Ingredient";
import { RecipeDetail } from "./RecipeDetail";
import ReactDOM, { render } from "react-dom";

export const AddIngredient : React.FC<{recipeId: number, addHandler: Function}> = ({children, recipeId, addHandler}) => {
    const [showUseEffect, setShowUseEffect] = useState(false);
    return <>
    <section className="addIngredientFormContainer">
    <button className="addIngredientButton" onClick={() => {
        setShowUseEffect(!showUseEffect);
    }}>Zutat hinzufügen</button>
    {showUseEffect && <AddIngredientInterface recipeId={recipeId} addHandler={addHandler}/>}
    </section></>;
    }

const AddIngredientInterface : React.FC<{recipeId: number, addHandler : Function}> = ({children, recipeId, addHandler}) => {
    return <>
    <form className="addIngredientForm">
        <label>Name</label>
        <input type="text" name="name"></input>
        <label>Menge</label>
        <input type="text" name="amount"></input>
        <label>Bild</label>
        <input type="text" name="imageUrl"></input>
        <button type="button" onClick={(e)=>{validateAndSave(e.currentTarget.parentElement, recipeId).then(addHandler())}}>Hinzufügen</button>
    </form>
    </>
}

async function validateAndSave(addIngredientForm :HTMLElement | null, recipeId : number){
    if(addIngredientForm === null){
        return;
    }

    var jsonRequestBody : IngredientRequestBody = {
        amount: "",
    };

    var ingredientToCheck : FormIngredient = {
        name : "",
        imageUrl: ""
    }

    for (let i = 0; i <addIngredientForm.children.length; i++){
        if(addIngredientForm.children[i].tagName === "INPUT"){
            let inputElement = addIngredientForm.children[i] as HTMLInputElement;
            switch(inputElement.name){
                case "amount":
                jsonRequestBody.amount = inputElement.value;
                    break;
                case "name":
                ingredientToCheck.name = inputElement.value;
                    break;
                case "imageUrl":
                ingredientToCheck.imageUrl = inputElement.value;
                    break;
            }
        }
    }
    
    const ingredientToAdd = await createIngredientIfNotExists(ingredientToCheck);
    if(ingredientToAdd !== undefined){
        console.log(recipeId);
    await addIngredientToRecipeOnDatabase(jsonRequestBody.amount, ingredientToAdd.id, recipeId);
    }
}

const createIngredientIfNotExists = async (ingredientToCheck: FormIngredient) => {
    const fetchIngredients = async () => {
        const ingredientRequest = await fetch("http://localhost:3000/api/ingredient/name/"+ingredientToCheck.name);
        const ingredientResponse = (await ingredientRequest.json()) as singleIngredientResponse;
        return ingredientResponse;
    }

    var ingredientResponse = await fetchIngredients();
    if(ingredientResponse.data === undefined){
        await addIngredientToDatabase(ingredientToCheck);
        ingredientResponse = await fetchIngredients();
    }
    return ingredientResponse.data;
}

const addIngredientToDatabase = async (jsonRequestBody: FormIngredient)=>{
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(jsonRequestBody)
      }
    await fetch("http://localhost:3000/api/ingredient", requestOptions).then(response => response.json());
}

const addIngredientToRecipeOnDatabase = async (amount: string, ingredientId: number, recipeId: number) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({amount: amount})
      } 
    await fetch("http://localhost:3000/api/recipe/"+recipeId+"/ingredients/"+ingredientId, requestOptions).then(response => response.json());
}