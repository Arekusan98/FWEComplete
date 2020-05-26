import {createConnection} from 'typeorm';

import{Recipe} from '../Entity/Recipe';
import{Ingredient} from '../Entity/Ingredient';
import{IngredientToRecipe} from '../Entity/IngredientToRecipe';
require('dotenv-safe').config();

/**
 * Connects to our database, retrying up to five times and logging failed
 * connection attempts.
 */
export const createDatabaseConnection = async () => {
  let retries = 5;
  while (retries) {
    try {
      const connection = await createConnection({
        type: 'mysql',
          host: process.env.DBHOST,
          port: Number(process.env.DBPORT),
          username: process.env.DBUSER,
          password: process.env.DBPASSWORD,
          database: process.env.DBDATABASE,
          synchronize: false,
          logging: false,
          entities: [Recipe, Ingredient, IngredientToRecipe],
          migrations: ['dist/migration/**/*.*'],
          subscribers: ['dist/{subscriber,domain,projection}/**/*.*'],
          cli: {
            entitiesDir: 'dist/{entity,domain,projection}',
            migrationsDir: 'dist/migration',
            subscribersDir: 'dist/{subscriber,domain,projection}',
          },
      });
      return connection;
    } catch (err) {
      retries -= 1;
      console.log(`DB-Connection failed. Retries left: ${retries}.`, err);
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  throw new Error('Could not establish a database connection!');
};
