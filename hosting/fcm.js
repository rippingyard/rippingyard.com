messaging.onBackgroundMessage(async payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification?.body || '',
    // icon: '/firebase-logo.png'
  };

  console.log('self.registration.showNotification', self.registration.showNotification);

  const result = await self.registration.showNotification(notificationTitle,
    notificationOptions);
  console.log('result', result);
});

self.addEventListener('push', async event => {
  console.log('event', event);
  console.log('self', self.serviceWorker);

  try {
    console.log('try');
    const result = await self.registration.showNotification('title', {
      body: 'body',
      icon: '/assets/img/ogp.png'
    });
    console.log('succeed', result);
  } catch (e) {
    console.error(e);
  }
});
