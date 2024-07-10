import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

export const makeServer = (module: any) => {
  const server = express();

  const createServer = async (expressInstance) => {
    const app = await NestFactory.create(
      module,
      new ExpressAdapter(expressInstance),
    );
    app.enableCors({
      origin: true,
    });
    return app.init();
  };

  createServer(server)
    .then(() => console.log('Server started'))
    .catch((e) => console.error(e));

  return server;
};
