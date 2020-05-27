export interface IngredientRequestBody {
    amount:string
}

export interface FormIngredient {
    name: string,
    imageUrl: string,
}

export interface IngredientResponse {
    data: Ingredient[];
}

export interface singleIngredientResponse{
    data : Ingredient
}

export interface Ingredient {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl:  string;
}

