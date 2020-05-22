import * as express from 'express'
import * as functions from 'firebase-functions'
const basicAuth = require('basic-auth-connect')
const { Nuxt } = require('nuxt')

process.env.DEBUG = 'nuxt:*'

const app = express()

const baConfig = {
  user: process.env.BAUTH_USER || 'test',
  password: process.env.BAUTH_PASSWORD || 'test'
}

if( functions.config().runtime.env !== 'production' ) {

  app.use(basicAuth( baConfig.user, baConfig.password ))

}

const nuxt = new Nuxt({
  dev: false,
  build: {
    publicPath: '/'
  }
})

app.use(async (req: any, res: any) => {
  await nuxt.renderRoute(req.url, { req }).then((result: any) => {
    res.send(result.html)
  }).catch((e: any) => {
    console.log(e)
    res.send(e)
  })
})

export = app