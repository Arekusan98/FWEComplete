"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRouter = void 0;
const express_1 = require("express");
const recipe_router_1 = require("./recipe.router");
const ingredient_router_1 = require("./ingredient.router");
const ingredientToRecipe_router_1 = require("./ingredientToRecipe.router");
exports.globalRouter = express_1.Router({ mergeParams: true });
exports.globalRouter.use('/recipe', recipe_router_1.recipeRouter);
exports.globalRouter.use('/ingredient', ingredient_router_1.ingredientRouter);
exports.globalRouter.use('/ingredientsToRecipe', ingredientToRecipe_router_1.ingredientsToRecipeRouter);
//# sourceMappingURL=global.router.js.map