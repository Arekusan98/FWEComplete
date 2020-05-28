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
exports.Ingredient = void 0;
const typeorm_1 = require("typeorm");
const IngredientToRecipe_1 = require("./IngredientToRecipe");
let Ingredient = /** @class */ (() => {
    let Ingredient = class Ingredient {
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Ingredient.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Ingredient.prototype, "name", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Ingredient.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Ingredient.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column({ default: "empty.jpg" }),
        __metadata("design:type", String)
    ], Ingredient.prototype, "imageUrl", void 0);
    __decorate([
        typeorm_1.OneToMany(() => IngredientToRecipe_1.IngredientToRecipe, ingredientToRecipe => ingredientToRecipe.ingredient),
        __metadata("design:type", Array)
    ], Ingredient.prototype, "ingredientToRecipe", void 0);
    Ingredient = __decorate([
        typeorm_1.Entity()
    ], Ingredient);
    return Ingredient;
})();
exports.Ingredient = Ingredient;
//# sourceMappingURL=Ingredient.js.map