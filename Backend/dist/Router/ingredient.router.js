"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientRouter = void 0;
const express_1 = require("express");
const ingredients_controller_1 = require("../Controller/ingredients.controller");
exports.ingredientRouter = express_1.Router({ mergeParams: true });
exports.ingredientRouter.post('/', ingredients_controller_1.createIngredient);
exports.ingredientRouter.get('/', ingredients_controller_1.getAllIngredients);
exports.ingredientRouter.get('/:ingredientId', ingredients_controller_1.getIngredientById);
exports.ingredientRouter.get('/name/:ingredientName', ingredients_controller_1.getIngredientByName);
exports.ingredientRouter.patch('/:ingredientId', ingredients_controller_1.updateIngredientById);
exports.ingredientRouter.delete('/:ingredientId', ingredients_controller_1.deleteIngredientById);
//# sourceMappingURL=ingredient.router.js.map