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
exports.deleteIngredientById = exports.getIngredientByName = exports.getIngredientById = exports.getAllIngredients = exports.updateIngredientById = exports.createIngredient = void 0;
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("../Entity/Ingredient");
const validateInput = (name, isBeingUpdated, id, ingredientRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (name === "") {
        return false;
    }
    if (!isBeingUpdated) {
        const ingredient = yield ingredientRepository.findOne({
            where: {
                name: name
            }
        });
        if (ingredient !== undefined) {
            return false;
        }
    }
    else {
        const ingredient = yield ingredientRepository.findOne({
            where: {
                name: name
            }
        });
        if (ingredient) {
            if (ingredient.id != id) {
                return false;
            }
        }
    }
    return true;
});
exports.createIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageUrl } = req.body;
    const ingredientRepository = yield typeorm_1.getRepository(Ingredient_1.Ingredient);
    const isValid = yield validateInput(name, false, null, ingredientRepository);
    if (!isValid) {
        return res.status(400).send("The ingredient either already exists or the name was left empty.");
    }
    const newIngredient = new Ingredient_1.Ingredient();
    newIngredient.name = name;
    newIngredient.imageUrl = imageUrl;
    const createdIngredient = yield ingredientRepository.save(newIngredient);
    return res.send({
        data: createdIngredient
    });
});
exports.updateIngredientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageUrl } = req.body;
    const id = req.params.ingredientId;
    const ingredientRepository = yield typeorm_1.getRepository(Ingredient_1.Ingredient);
    try {
        const isValid = yield validateInput(name, true, id, ingredientRepository);
        if (!isValid) {
            return res.status(400).send("The ingredient either already exists or the name was left empty.");
        }
        const ingredient = yield ingredientRepository.findOneOrFail({
            where: {
                id: id
            }
        });
        ingredient.name = name;
        ingredient.imageUrl = imageUrl;
        const updatedIngredient = yield ingredientRepository.save(ingredient);
        return res.send({ data: updatedIngredient });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.getAllIngredients = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientRepository = yield typeorm_1.getRepository(Ingredient_1.Ingredient);
    const ingredients = yield ingredientRepository.find();
    return res.send({ data: ingredients });
});
exports.getIngredientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientId = req.params.ingredientId;
    const ingredientRepository = yield typeorm_1.getRepository(Ingredient_1.Ingredient);
    const ingredient = yield ingredientRepository.findOne({
        where: {
            id: ingredientId,
        },
    });
    res.send({ data: ingredient });
});
exports.getIngredientByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientName = req.params.ingredientName;
    const ingredientRepository = yield typeorm_1.getRepository(Ingredient_1.Ingredient);
    const ingredient = yield ingredientRepository.findOne({
        where: {
            name: ingredientName,
        },
    });
    res.send({ data: ingredient });
});
exports.deleteIngredientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientId = req.params.ingredientId;
    const ingredientRepository = yield typeorm_1.getRepository(Ingredient_1.Ingredient);
    try {
        const ingredient = yield ingredientRepository.findOneOrFail({
            where: {
                id: ingredientId,
            },
        });
        ingredientRepository.remove(ingredient);
        res.send(200);
    }
    catch (error) {
        res.send(400);
    }
});
//# sourceMappingURL=ingredients.controller.js.map