// import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'

// admin.initializeApp(functions.config().firebase)
// const firestore = admin.firestore()

const loadFunctions = (obj:any) => {
  for( let name in obj ) {
    if( !process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name ) {
      exports[name] = require(obj[name])
    }
  }
}

console.log('process.env.FUNCTION_NAME:', process.env.FUNCTION_NAME)

loadFunctions({
  ssr: './ssr',
  onPostCreate: './functions/onPostCreate',
  onPostUpdate: './functions/onPostUpdate',
  onPostDelete: './functions/onPostDelete',
})

console.log('exports:', exports)