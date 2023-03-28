import { Dayjs } from 'dayjs';

type SitemapNode = {
  path: string;
  lastmod?: Dayjs;
  priority?: string;
  isIndex?: boolean;
}

export type Routes = SitemapNode[];

export const buildSitemap = (routes: Routes) => {
  const nodes: string[] = [];
  nodes.push('<?xml version="1.0" encoding="UTF-8"?>');
  nodes.push(`<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`);

  nodes.push(...buildNodes(routes));

  nodes.push(`</urlset>`);

  return nodes.join('');
}

export const buildSitemapIndex = (routes: Routes) => {
  const nodes: string[] = [];
  nodes.push('<?xml version="1.0" encoding="UTF-8"?>');
  nodes.push(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

  nodes.push(...buildNodes(routes));

  nodes.push(`</sitemapindex>`);

  return nodes.join('');
}

const buildNodes = (routes: Routes) => {
  const nodes: string[] = [];

  for (const node of routes) {
    nodes.push(node.isIndex ? '<sitemap>' : '<url>');

    nodes.push(`<loc>${getLoc(node.path)}</loc>`);
    if (node.lastmod) nodes.push(`<lastmod>${node.lastmod.format('YYYY-MM-DDThh:mm:ssZ')}</lastmod>`);
    if (node.priority) nodes.push(`<priority>${node.priority}</priority>`);

    nodes.push(node.isIndex ? '</sitemap>' : '</url>');
  }

  return nodes;
}

const getLoc = (path: string) => `${import.meta.env.NODE_ENV !== 'production' ? 'https://rippingyard-dev.web.app/' : 'https://www.rippingyard.com/'}${path}`