import { onRequest } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

// シンプルなHTTP関数
export const testHello = onRequest(async (req, res) => {
  console.log('testHello called');
  res.send('Hello from Firebase v2!');
});

// シンプルなFirestoreトリガー
export const testTrigger = onDocumentCreated('test/{docId}', async (event) => {
  console.log('Test document created:', event.params.docId);
  const data = event.data?.data();
  console.log('Document data:', data);
});