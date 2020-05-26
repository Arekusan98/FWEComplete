"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientsToRecipeRouter = void 0;
const express_1 = require("express");
const ingredientsToRecipe_controller_1 = require("../Controller/ingredientsToRecipe.controller");
exports.ingredientsToRecipeRouter = express_1.Router({ mergeParams: true });
exports.ingredientsToRecipeRouter.get('/recipe/:recipeId/ingredient/:ingredientId', ingredientsToRecipe_controller_1.getAmountsForRecipe);
//# sourceMappingURL=ingredientToRecipe.router.js.map