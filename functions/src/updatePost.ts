import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

// interface Post {
//   readonly title: string;
//   readonly body: string;
// }

// interface RootPost extends Post {
//   authorRef?: FirebaseFirestore.DocumentReference;
// }

export const onPostCreate = functions.firestore.document('/posts/{postId}').onCreate(async (snapshot, context) => {
  await syncPostToUser(snapshot, context);
});
export const onPostUpdate = functions.firestore.document('/posts/{postId}').onUpdate(async (change, context) => {
  await syncPostToUser(change.after, context);
});

async function syncPostToUser(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
  const postId = snapshot.id;
  // const userId = context.params.userId;
  // const post = snapshot.data() as RootPost;
  // post.authorRef = firestore.collection('users').doc(userId);
  await firestore.collection('docs').doc(postId).set({
    isTest: true
  }, { merge: true });
}
