import axios from "axios";
import { JSDOM } from 'jsdom';

type Params = {
  url: string;
}

export default eventHandler(async (event) => {
  try {
    // const { entity } = event.context.params as Params;
    const { url } = getQuery(event) as Params;
    console.log('url', url);

    if (!url) throw new Error('No Url');

    const res = await axios.get(url);

    if (!res) throw new Error('Not Found');

    const text = res.data;
    const doms = new JSDOM(text);
    const metas: any = doms.window.document.getElementsByTagName('meta');

    const metaData = {
      url,
      title: '',
      description: '',
      image: '',
    };

    for (let i = 0; i < metas.length; i++) {
      let pro = metas[i].getAttribute('property');
      if (typeof pro == 'string') {
        if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
        if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
        if (pro.match('image')) metaData.image = metas[i].getAttribute('content');
      }
      pro = metas[i].getAttribute('name');
      if (typeof pro == 'string') {
        if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
        if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
        if (pro.match('image')) metaData.image = metas[i].getAttribute('content');
      }
    }

    return metaData;
  } catch (e) {
    console.error(e);
    throw e;
  }
});