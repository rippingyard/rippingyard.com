import * as express from 'express'
// import * as functions from 'firebase-functions'
// const basicAuth = require('basic-auth-connect')
const { Nuxt } = require('nuxt')

process.env.DEBUG = 'nuxt:*'

const app = express()

// const baConfig = {
//   user: functions.config().auth.user || 'user',
//   password: functions.config().auth.password || 'pwd'
// }

// if( functions.config().runtime.env !== 'production' ) {
//   app.use(basicAuth( baConfig.user, baConfig.password ))
// }

const nuxt = new Nuxt({
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
})

app.use(async (req: any, res: any) => {
  await nuxt.renderRoute(req.url, { req }).then((result: any) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    console.log('result', result)
    res.send(result.html)
  }).catch((e: any) => {
    console.error(e)
    res.send(e)
  })
})

export = app
