import type { Secret } from '@rippingyard/schemas';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';

export const scanSecret = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: FirestoreEvent<any, any>,
  firestore: any,
) => {
  console.log('ScanSecret', snapshot, context, firestore);
  const newSecretId = snapshot.id;
  const newSecret = snapshot.data() as Secret;
  const { vendor } = newSecret;

  console.log('Start!', newSecretId, vendor);

  // 自分のsecretsを取得
  const secrets = await firestore
    .collection('secrets')
    .where('owner', '==', newSecret.owner)
    .where('vendor', '==', vendor)
    .get();

  secrets.forEach(async (doc) => {
    try {
      const secret = doc.data();
      console.log('secret', doc.id, secret);
      switch (vendor) {
        case 'fcm': {
          if (
            doc.id !== newSecretId &&
            secret?.payload?.token === newSecret?.payload?.token
          ) {
            await firestore.collection('secrets').doc(doc.id).delete();
          }
          break;
        }
        case 'twitter': {
          if (
            doc.id !== newSecretId &&
            secret?.payload?.accessToken === newSecret?.payload?.accessToken
          ) {
            await firestore.collection('secrets').doc(doc.id).delete();
          }
          break;
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};
