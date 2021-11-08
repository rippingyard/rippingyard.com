import * as express from 'express'
import { extract, OembedData } from 'oembed-parser'
const scrape = require('html-metadata')
const cors = require('cors')

const app = express()

app.use(cors({ origin: true }))
app.use(async (req, res) => {
  const url = req.body.data.url;
  if (!/^http(s):\/\//.test(url)) res.send({
    data: 'no url',
  });

  let data = {
    title: '',
    image: '',
    description: '',
    html: '',
    error: '',
    url,
  }

  try {
    const result = await scrape(url)

    if (result.general) {
      data.title = result.general.title
      data.description = result.general.description
    }

    if (result.openGraph) {
      if (result.openGraph.image) {
        if (result.openGraph.image.url) data.image = result.openGraph.image.url
      }
    }

    // console.log('Result', result)

    const oembed: OembedData & {
      html?: string
    } = await extract(url)
    if (oembed.title) data.title = oembed.title
    if (oembed.thumbnail_url) data.image = oembed.thumbnail_url
    if (oembed.html) data.html = oembed.html

    // console.log('oembed', oembed)

  } catch (e) {
    data.error = (e as any).message
  } finally {
    res.send({
      data,
    })
  }

})

export const fetchUrl = app
