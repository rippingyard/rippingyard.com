import firebase from 'firebase/app'

const config = process.env.FIREBASE_CONFIG

console.log(config)

require('firebase/firestore')
require('firebase/auth')
require('firebase/storage')

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey:             config.apiKey,
    authDomain:         config.authDomain,
    databaseURL:        config.databaseURL,
    projectId:          config.projectId,
    storageBucket:      config.storageBucket,
    messagingSenderId:  config.messagingSenderId,
    appId:              config.appId,
    measurementId:      config.measurementId,
  })
}

export default firebase

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const timestamp = firebase.firestore.Timestamp
