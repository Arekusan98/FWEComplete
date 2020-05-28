import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany} from "typeorm";
import { IngredientToRecipe } from "./IngredientToRecipe";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @CreateDateColumn()
    createdAt: string;
    @UpdateDateColumn()
    updatedAt: string;
    @Column({default: "empty.jpg"})
    imageUrl: string;
    @OneToMany(() => IngredientToRecipe, ingredientToRecipe => ingredientToRecipe.ingredient)
    public ingredientToRecipe!: IngredientToRecipe[];
}