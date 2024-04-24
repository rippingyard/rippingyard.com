import {
  json,
  redirect,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@vercel/remix';
import type { ActionFunction } from '@vercel/remix';
import { StorageError, getDownloadURL, ref } from 'firebase/storage';

import { useBucket } from '~/hooks/firebase/useBucket.server';
import { useStorage } from '~/hooks/firebase/useStorage';
import { getMe } from '~/middlewares/session.server';

export const action: ActionFunction = async ({ request }) => {
  try {
    const { storage } = useStorage();
    const { uid } = await getMe(request);

    if (!uid) return redirect('/');

    const form = await unstable_parseMultipartFormData(
      request,
      unstable_createMemoryUploadHandler({
        maxPartSize: 12000000,
      })
    );

    const file = form.get('file') as Blob;
    const contentType = file.type;
    const filename = form.get('filename') as string;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const handler = useBucket().file(filename);
    await handler.save(buffer);
    await handler.setMetadata({ contentType });

    const url = await getDownloadURL(ref(storage, filename));

    return json({
      url,
    });
  } catch (e: unknown) {
    console.error(e);

    const status: number = e instanceof StorageError ? e.status : 400;

    return json(
      {
        error: e,
      },
      {
        status,
      }
    );
  }
};
