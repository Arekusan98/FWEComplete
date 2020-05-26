"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountsForRecipe = void 0;
const IngredientToRecipe_1 = require("../Entity/IngredientToRecipe");
const typeorm_1 = require("typeorm");
exports.getAmountsForRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientId = req.params.ingredientId;
    const recipeId = req.params.recipeId;
    const ingredientToRecipeRepository = yield typeorm_1.getRepository(IngredientToRecipe_1.IngredientToRecipe);
    const ingredientsToRecipes = yield ingredientToRecipeRepository.find({ where: { recipeId: recipeId, ingredientId: ingredientId } });
    console.log(req);
    res.send({ data: ingredientsToRecipes });
});
//# sourceMappingURL=ingredientsToRecipe.controller.js.map