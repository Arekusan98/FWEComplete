export interface IngredientToRecipeResponse {
    data: IngredientToRecipe[];
}

export interface IngredientToRecipe {
    ingredientToRecipeId: number,
    ingredientId: number,
    recipeId: number,
    amount: string
}
