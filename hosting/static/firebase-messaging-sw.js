/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  "apiKey": "AIzaSyAHgPMZvD4z6nJqxAyidWO5hO26XvJhhfk",
  "authDomain": "rippingyard-dev.firebaseapp.com",
  "databaseURL": "https://rippingyard-dev.firebaseio.com",
  "projectId": "rippingyard-dev",
  "storageBucket": "rippingyard-dev.appspot.com",
  "messagingSenderId": "105888186327",
  "appId": "1:105888186327:web:9841ea77e8f39e86",
  "measurementId": "G-EP8FX1M3Q8"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    // icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});