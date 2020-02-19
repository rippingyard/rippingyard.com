import firebase from 'firebase/app'

require('firebase/firestore')
require('firebase/auth')
require('firebase/storage')

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGESENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
  })
}

export default firebase

// export const db = firebase.firestore()
// export const auth = firebase.auth()
// export const storage = firebase.storage()
// export const timestamp = firebase.firestore.Timestamp
