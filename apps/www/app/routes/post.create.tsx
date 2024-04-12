import { json, redirect } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@vercel/remix';
import { Timestamp } from 'firebase-admin/firestore';

import { PostEditor } from '~/features/postEditor';
import { useDocReference } from '~/hooks/firestore/useDocReference';
import { useSavePost } from '~/hooks/save/useSavePost.server';
import { getMe, isAuthenticated } from '~/middlewares/session.server';
import { containerStyle, edgeStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const title = '新規投稿';
    const canonicalUrl = new URL('post/create', request.url).toString();

    const isAuthed = await isAuthenticated(request);
    if (!isAuthed) return redirect('/');

    return json({
      title,
      canonicalUrl,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    });
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const savePost = useSavePost();

  try {
    const { uid } = await getMe(request);

    if (!uid) throw new Error('Unauthenticated');

    const formData = await request.formData();

    const contentBody = formData.get('content') as string;
    const title = formData.get('title') as string;
    const content = title ? `<h1>${title}</h1>${contentBody}` : contentBody;

    console.log('formData', { title, content });

    const owner = useDocReference('users', uid);
    console.log('owner', owner);

    const post = await savePost({
      content,
      type: 'log',
      status: 'published',
      publishedAt: Timestamp.now(),
      isPublic: true,
    });

    console.log('saved!', post);

    return json({
      post,
    });
  } catch (e) {
    console.error(e);
    return json(e, {
      status: 400,
    });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { title, canonicalUrl } = data;

  const htmlTitle = `${title} - rippingyard`;
  const image = '/images/ogimage.png';

  return [
    { title: htmlTitle },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // { name: 'description', content: description },
    // { property: 'og:title', content: htmlTitle },
    // { property: 'og:description', content: summary },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    // { name: 'twitter:title', content: htmlTitle },
    // { name: 'twitter:description', content: summary },
    { name: 'twitter:image', content: image },
    // { name: 'twitter:card', content: 'summary' },
  ];
};

export default function Main() {
  const className = [containerStyle, edgeStyle].join(' ');

  return (
    <main className={className}>
      <PostEditor />
    </main>
  );
}
