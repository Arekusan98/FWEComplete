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

export interface RecipeRequest{
    name: string;
    cookingInstructions: string;
    rating: number;
    author: string;
    servingSize: number;
}
