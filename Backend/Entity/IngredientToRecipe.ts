import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@Entity()
export class IngredientToRecipe {
    @PrimaryGeneratedColumn()
    public ingredientToRecipeId!: number;

    @Column()
    public ingredientId!: number;

    @Column()
    public recipeId!: number;

    @Column()
    public amount!: string;

    @ManyToOne(() => Recipe, recipe => recipe.ingredientToRecipe)
    public recipe!: Recipe;

    @ManyToOne(() => Ingredient, ingredient => ingredient.ingredientToRecipe,
    {cascade: true})
    public ingredient!: Ingredient;
}