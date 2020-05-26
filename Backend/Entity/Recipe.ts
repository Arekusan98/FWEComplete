import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany} from "typeorm";
import { IngredientToRecipe } from "./IngredientToRecipe";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @CreateDateColumn()
    createdAt: string;
    @UpdateDateColumn()
    updatedAt: string;
    @Column()
    cookingInstructions: string;
    @Column()
    rating: number;
    @Column()
    author: string;
    @Column()
    servingSize: number;
    @OneToMany(() => IngredientToRecipe, ingredientToRecipe => ingredientToRecipe.recipe,
    {cascade: true})
    public ingredientToRecipe!: IngredientToRecipe[];
}