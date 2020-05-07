import * as express from 'express';
const { Nuxt } = require('nuxt');

process.env.DEBUG = 'nuxt:*'

const app = express();
const nuxt = new Nuxt({
  dev: false,
  // buildDir: '.nuxt',
  build: {
    publicPath: '/'
  }
});

// app.use(nuxt.render);

app.use(async (req: any, res: any) => {
  // await nuxt.ready()
  // return await nuxt.render(req, res)
  await nuxt.renderRoute(req.url, { req }).then((result: any) => {
    res.send(result.html)
  }).catch((e: any) => {
    console.log(e)
    res.send(e)
  })
})

export = app