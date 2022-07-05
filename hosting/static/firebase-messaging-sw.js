
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js'
)
// eslint-disable-next-line no-undef
firebase.initializeApp({ "apiKey": "AIzaSyAHgPMZvD4z6nJqxAyidWO5hO26XvJhhfk", "authDomain": "rippingyard-dev.firebaseapp.com", "databaseURL": "https:\u002F\u002Frippingyard-dev.firebaseio.com", "projectId": "rippingyard-dev", "storageBucket": "rippingyard-dev.appspot.com", "messagingSenderId": "105888186327", "appId": "1:105888186327:web:9841ea77e8f39e86", "measurementId": "G-EP8FX1M3Q8" })

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function (e) {
  console.log('TEST');
  const actions = [{ "action": "randomName", "url": "randomUrl" }]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification?.body || '',
    // icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

