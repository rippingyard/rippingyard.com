import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { extract, hasProvider, OembedData } from 'oembed-parser';
import * as scrape from 'html-metadata';

type Embed = {
  title?: string;
  site?: string;
  description?: string;
  image?: string;
  url?: string;
  html?: string;
  video?: any;
  error?: string;
};

@Injectable()
export class fetchUrlService {
  async exec(req: Request) {
    console.log('req.url', req.url);

    try {
      const url = req.body.data.url;
      if (!url || !/^http(s)?:\/\//.test(url)) {
        return {
          data: {
            error: 'noUrl',
          },
        };
      }
      const data: Embed = {
        title: '',
        site: '',
        image: '',
        description: '',
        html: '',
        error: '',
        url,
      };
      const result = await scrape({
        url,
        encoding: 'utf8',
      });
      // console.log('result type', typeof result)
      // const encoding = encodeDetector.detect(result.general.title);
      // result.general.title = encodeDetector.convert(result.general.title, {
      //   to: 'UTF8',
      //   from: 'SJIS',
      // })
      // console.log('result.general.title', result.general.title);
      if (result.general) {
        data.title = result.general.title;
        data.description = result.general.description;
        if (result.general.canonical) data.url = result.general.canonical;
      }
      if (result.openGraph) {
        if (result.openGraph.title) data.title = result.openGraph.title;
        if (result.openGraph.site_name) data.site = result.openGraph.site_name;
        if (result.openGraph.description)
          data.description = result.openGraph.description;
        if (result.openGraph.image) {
          if (result.openGraph.image.url)
            data.image = result.openGraph.image.url;
        }
        if (result.openGraph.video) {
          data.video = result.openGraph.video;
        }
      }
      console.log('Result', result);
      if (hasProvider(url)) {
        const oembed: OembedData & {
          html?: string;
        } = await extract(url);
        if (oembed.title) data.title = oembed.title;
        if (oembed.thumbnail_url) data.image = oembed.thumbnail_url;
        if (oembed.html) data.html = oembed.html;
      }

      // By Site
      if (url.match(/^https:\/\/(.*)\.bandcamp\.com/)) {
        data.site = 'bandcamp';
      }

      console.log('data', data);
      return {
        data,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
