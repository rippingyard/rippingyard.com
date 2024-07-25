import {
  json,
  redirect,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@vercel/remix';
import type { ActionFunction } from '@vercel/remix';
import { getDownloadURL } from 'firebase-admin/storage';

import { useBucket } from '~/hooks/firebase/useBucket.server';
import { getMe } from '~/middlewares/session.server';

export const action: ActionFunction = async ({ request }) => {
  try {
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
    await handler.save(buffer, {
      metadata: { contentType },
      resumable: false,
    });

    const url = await getDownloadURL(handler);

    return json({
      url,
    });
  } catch (e: unknown) {
    console.error('Upload error:', e);
    if (typeof e === 'object' && e !== null) {
      console.error('Error details:', JSON.stringify(e, null, 2));
    }

    return json(
      {
        error: e,
      },
      {
        status: 400,
      }
    );
  }
};
