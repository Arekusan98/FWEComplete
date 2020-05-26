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
exports.createDatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
const Recipe_1 = require("../Entity/Recipe");
const Ingredient_1 = require("../Entity/Ingredient");
const IngredientToRecipe_1 = require("../Entity/IngredientToRecipe");
require('dotenv-safe').config();
/**
 * Connects to our database, retrying up to five times and logging failed
 * connection attempts.
 */
exports.createDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let retries = 5;
    while (retries) {
        try {
            const connection = yield typeorm_1.createConnection({
                type: 'mysql',
                host: process.env.DBHOST,
                port: Number(process.env.DBPORT),
                username: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBDATABASE,
                synchronize: false,
                logging: false,
                entities: [Recipe_1.Recipe, Ingredient_1.Ingredient, IngredientToRecipe_1.IngredientToRecipe],
                migrations: ['dist/migration/**/*.*'],
                subscribers: ['dist/{subscriber,domain,projection}/**/*.*'],
                cli: {
                    entitiesDir: 'dist/{entity,domain,projection}',
                    migrationsDir: 'dist/migration',
                    subscribersDir: 'dist/{subscriber,domain,projection}',
                },
            });
            return connection;
        }
        catch (err) {
            retries -= 1;
            console.log(`DB-Connection failed. Retries left: ${retries}.`, err);
            // wait 5 seconds
            yield new Promise((res) => setTimeout(res, 5000));
        }
    }
    throw new Error('Could not establish a database connection!');
});
//# sourceMappingURL=CreateDatabaseConnection.js.map