import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Nuxt } from 'nuxt';

const { renderRoute, renderer } = new Nuxt({
  dev: false,
  build: {
    publicPath: '/_nuxt/',
    analyze: true,
  },
  terser: {
    terserOptions: {
      compress: { drop_console: true },
    },
  },
});

@Injectable()
export class HttpService {
  async ssr(req: Request): Promise<string> {
    console.log('req.url', req.url);
    console.log('nuxt.renderer', renderer.renderRoute);

    const result = await renderRoute(req.url, { req });

    console.log('nuxt: result', result.html);

    return 'Hello World!';
  }
}
