import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Nuxt } from 'nuxt';

const { renderRoute } = new Nuxt({
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
    const { html } = await renderRoute(req.url, { req });
    return html;
  }
}
