import { useActionData, useLocation, useNavigate } from '@remix-run/react';
import { json, redirect } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@vercel/remix';
import clsx from 'clsx';
import { Timestamp } from 'firebase-admin/firestore';
import { useEffect } from 'react';

import { PostEditor } from '~/features/postEditor';
import { clearCachedItems } from '~/hooks/cache/useCache';
import { useCachedContent } from '~/hooks/cache/useCachedContent';
import { usePostFormData } from '~/hooks/form/usePostFormData';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useCanCreatePost } from '~/hooks/permission/useCanCreatePost';
import { useSavePost } from '~/hooks/save/useSavePost.server';
import { commitSession, getMe, getSession } from '~/middlewares/session.server';
import { containerStyle, edgeStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const canCreatePost = useCanCreatePost();

  try {
    const title = '新規投稿';
    const canonicalUrl = new URL('post/create', request.url).toString();

    // 権限確認
    const { uid, role } = await getMe(request);
    if (!uid || !canCreatePost(role)) {
      const session = await getSession(request.headers.get('Cookie'));
      session.flash(
        'alertMessage',
        '利用権限がありません。ログインしてください'
      );
      return redirect('/login', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }

    return json({
      title,
      canonicalUrl,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    });
  } catch (e) {
    console.error(e);
    throw new Response('Not Found', { status: 404 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const savePost = useSavePost();

  try {
    const { uid } = await getMe(request);

    if (!uid) throw new Error('Unauthenticated');

    const formData = await usePostFormData(request);

    const { post } = await savePost({
      publishedAt: Timestamp.now(),
      uid,
      ...formData,
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
  const navigate = useNavigate();
  const postLink = usePostLink();
  const { pathname } = useLocation();
  const { clearCachedContent } = useCachedContent();

  const result = useActionData<typeof action>();
  useEffect(() => {
    if (!result?.post) return;

    clearCachedContent(pathname);
    clearCachedItems();

    const permalink = postLink(result.post.id);

    navigate(permalink);
  }, [clearCachedContent, navigate, pathname, postLink, result]);

  return (
    <main className={clsx(containerStyle, edgeStyle)}>
      <PostEditor />
    </main>
  );
}
