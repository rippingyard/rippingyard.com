import * as express from 'express'
// import * as functions from 'firebase-functions'
import { extract, hasProvider, OembedData } from 'oembed-parser'
const scrape = require('html-metadata')
const cors = require('cors')

type Embed = {
  title?: string
  site?: string
  description?: string
  image?: string
  url?: string
  html?: string
  error?: string
}

const app = express()

app.use(cors({ origin: true }))
app.use(async (req, res) => {
  const url = req.body.data.url;
  if (!url || !/^http(s)?:\/\//.test(url)) {
    res.status(400).send({
      data: {
        error: 'noUrl',
      }
    })
  }

  let data: Embed = {
    title: '',
    site: '',
    image: '',
    description: '',
    html: '',
    error: '',
    url,
  }

  const result = await scrape(url)

  if (result.general) {
    data.title = result.general.title
    data.description = result.general.description
    if (result.general.canonical) data.url = result.general.canonical
  }

  if (result.openGraph) {
    if (result.openGraph.title) data.title = result.openGraph.title
    if (result.openGraph.site_name) data.site = result.openGraph.site_name
    if (result.openGraph.description) data.description = result.openGraph.description
    if (result.openGraph.image) {
      if (result.openGraph.image.url) data.image = result.openGraph.image.url
    }
  }

  console.log('Result', result)

  if (hasProvider(url)) {
    try {
      const oembed: OembedData & {
        html?: string
      } = await extract(url)
      if (oembed.title) data.title = oembed.title
      if (oembed.thumbnail_url) data.image = oembed.thumbnail_url
      if (oembed.html) data.html = oembed.html

      console.log('oembed', oembed)
    } catch (e) {
      console.error('catch!', e)
    }
  }

  res.send({
    data,
  })

})

export const fetchUrl = app
