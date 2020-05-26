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
exports.GetAllIngredientsFromRecipe = exports.RemoveIngredientFromRecipe = exports.addIngredientToRecipe = exports.removeRecipeById = exports.updateRecipeById = exports.getRecipeById = exports.getAllRecipes = exports.createRecipe = void 0;
const typeorm_1 = require("typeorm");
const Recipe_1 = require("../Entity/Recipe");
const Ingredient_1 = require("../Entity/Ingredient");
const IngredientToRecipe_1 = require("../Entity/IngredientToRecipe");
exports.createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, servingSize, cookingInstructions, author, rating } = req.body;
    const recipeRepository = yield typeorm_1.getRepository(Recipe_1.Recipe);
    const newRecipe = new Recipe_1.Recipe();
    newRecipe.name = name;
    newRecipe.servingSize = servingSize;
    newRecipe.cookingInstructions = cookingInstructions;
    newRecipe.author = author;
    newRecipe.rating = rating;
    const createdRecipe = yield recipeRepository.save(newRecipe);
    return res.send({
        data: createdRecipe,
    });
});
exports.getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeRepository = yield typeorm_1.getRepository(Recipe_1.Recipe);
    const recipes = yield recipeRepository.find();
    console.log(req);
    res.send({ data: recipes });
});
exports.getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.recipeId;
    const recipeRepository = yield typeorm_1.getRepository(Recipe_1.Recipe);
    const recipe = yield recipeRepository.findOne({ where: { id: id } });
    res.send({ data: recipe });
});
exports.updateRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, servingSize, cookingInstructions, author, rating } = req.body;
    const id = req.params.recipeId;
    const recipeRepository = yield typeorm_1.getRepository(Recipe_1.Recipe);
    try {
        const recipe = yield recipeRepository.findOneOrFail({
            where: {
                id: id
            }
        });
        recipe.name = name;
        recipe.servingSize = servingSize;
        recipe.cookingInstructions = cookingInstructions;
        recipe.author = author;
        recipe.rating = rating;
        const updatedRecipe = yield recipeRepository.save(recipe);
        res.send({ data: updatedRecipe });
    }
    catch (error) {
        res.sendStatus(400);
    }
});
exports.removeRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.recipeId;
    const recipeRepository = yield typeorm_1.getRepository(Recipe_1.Recipe);
    try {
        const recipe = yield recipeRepository.findOneOrFail({
            where: {
                id: recipeId,
            },
        });
        yield recipeRepository.remove(recipe);
        res.send(200);
    }
    catch (error) {
        res.send(400);
    }
});
exports.addIngredientToRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.recipeId;
    const ingredientId = req.params.ingredientId;
    const { amount } = req.body;
    const ingredientToRecipeRepository = yield typeorm_1.getRepository(IngredientToRecipe_1.IngredientToRecipe);
    const ingredientRepository = yield typeorm_1.getRepository(Ingredient_1.Ingredient);
    const recipeRepository = yield typeorm_1.getRepository(Recipe_1.Recipe);
    try {
        const recipe = yield recipeRepository.findOneOrFail({ where: { id: recipeId } });
        const ingredient = yield ingredientRepository.findOneOrFail({ where: { id: ingredientId } });
        const ingredientToRecipe = yield ingredientToRecipeRepository.findOne({ where: { recipeId: recipeId, ingredientId: ingredientId } });
        if (!ingredientToRecipe) {
            let ingToRec = new IngredientToRecipe_1.IngredientToRecipe();
            ingToRec.amount = amount;
            ingToRec.ingredientId = ingredient.id;
            ingToRec.ingredient = ingredient;
            ingToRec.recipeId = recipe.id;
            ingToRec.recipe = recipe;
            yield ingredientToRecipeRepository.save(ingToRec);
            return res.send({
                data: {
                    ingredient: ingredient,
                    recipe: recipe,
                    ingredientToRecipe: ingToRec
                }
            });
        }
        return res.status(400).send("Ingredient is already added");
    }
    catch (error) {
        return res.status(400).send("Ingredient or recipe does not exist");
    }
});
exports.RemoveIngredientFromRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.recipeId;
    const ingredientId = req.params.ingredientId;
    const ingredientToRecipeRepository = yield typeorm_1.getRepository(IngredientToRecipe_1.IngredientToRecipe);
    try {
        const ingredientToRecipe = yield ingredientToRecipeRepository.findOneOrFail({ where: { recipeId: recipeId, ingredientId: ingredientId } });
        yield ingredientToRecipeRepository.delete(ingredientToRecipe);
        return res.send({
            data: {
                ingredient: ingredientId,
                recipe: recipeId,
                ingredientToRecipe: ingredientToRecipe
            }
        });
    }
    catch (error) {
        return res.status(400).send("Ingredient, recipe or relation between the two does not exist");
    }
});
exports.GetAllIngredientsFromRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.recipeId;
    const ingredientToRecipeRepository = yield typeorm_1.getRepository(IngredientToRecipe_1.IngredientToRecipe);
    try {
        const ingredientToRecipe = yield ingredientToRecipeRepository.find({ where: { recipeId: recipeId }, relations: ["ingredient"] });
        if (ingredientToRecipe.length === 0) {
            return res.status(400).send("This recipe has no ingredients");
        }
        var ingredients = [];
        for (let i = 0; i < ingredientToRecipe.length; i++) {
            ingredients.push(ingredientToRecipe[i].ingredient);
        }
        return res.send({ data: ingredients });
    }
    catch (error) {
        return res.status(400).send("There has been an error");
    }
});
//# sourceMappingURL=recipe.controller.js.map