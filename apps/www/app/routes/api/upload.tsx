import { parseFormData, FileUpload } from '@mjackson/form-data-parser';
import { getDownloadURL } from 'firebase-admin/storage';
import { redirect } from 'react-router';
import { data } from 'react-router';

import { useBucket } from '~/hooks/firebase/useBucket.server';
import { getMe, getSession } from '~/middlewares/session.server';

import { Route } from './+types/upload';

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const { uid } = await getMe(request);

    if (!uid) return redirect('/');

    const form = await parseFormData(request, undefined, {
      maxFileSize: 1024 * 1024 * 1, // 10MB
    });

    const file = form.get('file') as FileUpload;
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

    return Response.json({
      url,
    });
  } catch (e: unknown) {
    console.error('Upload error:', e);
    if (typeof e === 'object' && e !== null) {
      console.error('Error details:', JSON.stringify(e, null, 2));
    }

    const session = await getSession(request.headers.get('Cookie'));
    session.flash('alertMessage', e as string);

    return data(
      {
        error: e,
      },
      {
        status: 400,
      }
    );
  }
};
