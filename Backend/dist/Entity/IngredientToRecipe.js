"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientToRecipe = void 0;
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("./Ingredient");
const Recipe_1 = require("./Recipe");
let IngredientToRecipe = /** @class */ (() => {
    let IngredientToRecipe = class IngredientToRecipe {
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], IngredientToRecipe.prototype, "ingredientToRecipeId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], IngredientToRecipe.prototype, "ingredientId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], IngredientToRecipe.prototype, "recipeId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IngredientToRecipe.prototype, "amount", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Recipe_1.Recipe, recipe => recipe.ingredientToRecipe),
        __metadata("design:type", Recipe_1.Recipe)
    ], IngredientToRecipe.prototype, "recipe", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Ingredient_1.Ingredient, ingredient => ingredient.ingredientToRecipe, { cascade: true }),
        __metadata("design:type", Ingredient_1.Ingredient)
    ], IngredientToRecipe.prototype, "ingredient", void 0);
    IngredientToRecipe = __decorate([
        typeorm_1.Entity()
    ], IngredientToRecipe);
    return IngredientToRecipe;
})();
exports.IngredientToRecipe = IngredientToRecipe;
//# sourceMappingURL=IngredientToRecipe.js.map