import { json, redirect } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@vercel/remix';

import { PostEditor } from '~/features/postEditor';
import { isAuthenticated } from '~/middlewares/session.server';
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
  try {
    const formData = await request.formData();

    const content = formData.get('content');
    const title = formData.get('title');

    console.log('formData', { title, content });

    if (!(await isAuthenticated(request))) return redirect('/');

    return json({});
  } catch (e) {
    console.error(e);
    throw new Response('Error', { status: 400 });
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
