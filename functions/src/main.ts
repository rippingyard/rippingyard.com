import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { HttpModule } from './http/http.module';
import { ExpressAdapter } from '@nestjs/platform-express';

admin.initializeApp(functions.config().firebase);
// const firestore = admin.firestore()

const server = express();

const createHttpServer = async (expressInstance) => {
  const app = await NestFactory.create(
    HttpModule,
    new ExpressAdapter(expressInstance),
  );
  console.log('start the server');
  return app.init();
};

createHttpServer(server)
  .then(() => console.log('Server started'))
  .catch((e) => console.error(e));

export const ssr = functions.https.onRequest(server);
