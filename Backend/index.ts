import express from 'express';
import "reflect-metadata";
import { createDatabaseConnection } from './Util/CreateDatabaseConnection';
import { globalRouter } from './Router/global.router';
import * as bodyParser from 'body-parser';

require('dotenv-safe').config();
export const startServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  const port: number = Number(process.env.PORT);

  const dbConnection = await createDatabaseConnection();

  app.use('/api', globalRouter);

  const server = app.listen(port, () => {
    console.log('Example app listening on port: ', port);
  });

  return {server, dbConnection}
}

// tslint:disable-next-line: no-floating-promises
startServer();