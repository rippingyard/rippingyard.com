import {
  json,
  redirect,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@vercel/remix';
import type { ActionFunction } from '@vercel/remix';

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

    const formFile = form.get('file') as Blob;
    const contentType = formFile.type;
    const filename = form.get('filename') as string;

    const arrayBuffer = await formFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const bucket = useBucket();
    console.log('Bucket object:', bucket);

    const file = bucket.file(filename);
    await file.save(buffer, {
      metadata: { contentType },
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-17-2025',
    });

    return json({ url });
  } catch (e: unknown) {
    console.error('File upload error:', e);
    if (e instanceof Error) {
      console.error('Error message:', e.message);
      console.error('Error stack:', e.stack);
    }

    return json({ error: 'File upload failed' }, { status: 400 });
  }
};
