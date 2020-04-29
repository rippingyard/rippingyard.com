import * as express from 'express';
const { Nuxt } = require('nuxt');

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
    res.send(e)
  })
})
// exports.ssr = functions.https.onRequest(app);

export = app