import * as functions from 'firebase-functions';
import { Secret } from '../../types/secret';

export const scanSecret = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext,
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
    .where('vendor', '==', newSecret.vendor)
    .get();

  for (const secret of secrets) {
    switch (vendor) {
      case 'fcm': {
        if (
          secret?.id !== newSecretId &&
          secret?.payload?.token === newSecret?.payload?.token
        ) {
          await firestore.collection('secrets').doc(secret.id).delete();
        }
        break;
      }
    }
  }
};
