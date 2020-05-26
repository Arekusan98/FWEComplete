import React from "react";
import ReactDOM from "react-dom";
import { Dashboard } from "./Dashboard";
import { AddRecipe } from "./AddRecipe";

const main = document.getElementsByTagName("main")[0];
ReactDOM.render(<Dashboard />, main);
const addRecipeButtonSection = document.getElementById("addRecipeButtonSection");
ReactDOM.render(<AddRecipe />, addRecipeButtonSection);
