import { writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { defineNuxtModule, useNuxt } from '@nuxt/kit';
import { join } from 'pathe';

export default defineNuxtModule({
  meta: {
    name: 'sitemap',
  },
  setup() {
    const nuxt = useNuxt();
    nuxt.hook('nitro:init', nitro => {
      nitro.hooks.hook('close', async () => {
        // console.log(nitro, '← nitro');
        console.log('nitro._prerenderedRoutes', nitro._prerenderedRoutes);
        const routes = nitro._prerenderedRoutes
          ?.filter(r => r.fileName?.endsWith('.html'))
          .map(r => r.route)
        if (!routes?.length) return;
        const timestamp = new Date().toISOString();
        const domain = process.env.NODE_ENV !== 'production' ? 'https://rippingyard-dev.web.app' : 'https://www.rippingyard.com';
        const sitemap = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...routes.map(
            route => `<url><loc>${domain}${route}</loc><lastmod>${timestamp}</lastmod></url>`
          ),
          `</urlset>`,
        ].join('')
        const dir = nitro.options.output.publicDir
        await writeFile(join(dir, 'sitemap.xml'), sitemap)
        await writeFile(join(dir, 'sitemap.xml.gz'), gzipSync(sitemap))
      })
    })
  },
})