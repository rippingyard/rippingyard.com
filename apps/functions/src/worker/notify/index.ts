import dayjs from 'dayjs';
import type { Activity, Notification, User } from '@rippingyard/schemas';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';

export async function notify(
  snapshot: FirebaseFirestore.DocumentSnapshot,
  _: FirestoreEvent<any, any>,
  firestore: any,
) {
  const activityId = snapshot.id;
  const activity = snapshot.data() as Partial<Activity>;

  // console.log('Action By', await (activity.owner as any).get())

  // status !== 'succeeded'の場合は無視
  if (activity.status !== 'succeeded') return;

  const params: Partial<Notification> = {
    level: 'info',
    activity: firestore.doc(`/activities/${activityId}`),
    targets: [],
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  };

  let user: Partial<User> = {
    displayName: '削除されたユーザー',
  };

  let parent: any = {};

  switch (activity.type) {
    case 'post:create':
      if (!activity.owner) return;
      params.owner = activity?.owner;

      if (!activity.payload.isPublic || activity.payload.status !== 'published')
        return;

      await (params.owner as any).get().then((qs: any) => {
        user = qs.data();
      });

      params.to = `post/${activity.payload.id}`;
      params.message = `<strong>${user.displayName}</strong>が、記事を投稿しました`;

      // if (user.followers) params.targets = user.followers;
      if (user.avatar) params.image = user.avatar;

      console.log('post:create', params);
      break;

    case 'comment:create':
      if (!activity.owner) return;
      params.owner = activity.owner;

      if (!activity.payload.isPublic) return;

      await (params.owner as any).get().then((qs: any) => {
        user = qs.data();
      });
      // if (user.followers) params.targets = user.followers;

      // 親記事があった場合
      if (activity.payload.parent) {
        await (activity.payload.parent as any).get().then((qs: any) => {
          parent = qs.data();
        });
        // console.log('親記事', parent, activity.payload.parent.parent.id)
        // TODO: EntityとPostで分けたい

        if (parent.owner && parent.owner !== params.owner) {
          params.targets?.push(parent.owner);
        }

        switch (activity.payload.parent.parent.id) {
          case 'posts':
            params.message = `<strong>${user.displayName}</strong>が、記事にコメントしました`;
            params.to = `post/${activity.payload.parent.id}`;
            break;

          case 'entities':
            params.message = `<strong>${user.displayName}</strong>が、エンティティにコメントしました`;
            params.to = `entity/${activity.payload.parent.id}`;
            break;
        }
      }

      if (user.avatar) params.image = user.avatar;

      if (!params.message)
        params.message = `${user.displayName}が、コメントしました`;

      // console.log('comment:create', activity.payload)
      break;

    case 'follow':
      break;

    default:
      console.warn('Nothing to do!!');
      break;
  }

  if (params.message) {
    await firestore.collection('notifications').add(params);
  }
}
