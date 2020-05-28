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
    @Column({default: 1})
    rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    @Column({default: "unknown"})
    author: string;
    @Column({default: 4})
    servingSize: number;
    @OneToMany(() => IngredientToRecipe, ingredientToRecipe => ingredientToRecipe.recipe,
    {cascade: true})
    public ingredientToRecipe!: IngredientToRecipe[];
}