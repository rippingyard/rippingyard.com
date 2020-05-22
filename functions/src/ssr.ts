import * as express from 'express'
// import * as basicAuth from 'express-basic-auth'
const { Nuxt } = require('nuxt')

process.env.DEBUG = 'nuxt:*'

const app = express()

// const baConfig = {
//   user: process.env.BAUTH_USER || 'test',
//   password: process.env.BAUTH_PASSWORD || 'test'
// }

// if( process.env.NODE_ENV == 'production' ) {

//   app.use(basicAuth( { authorizer: ryAuthorizer } ))
 
//   function ryAuthorizer(username:string, password:string) {
//     const userMatch = basicAuth.safeCompare(username, baConfig.user)
//     const passwordMatch = basicAuth.safeCompare(password, baConfig.password)
 
//     return userMatch && passwordMatch
//   }

// }

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