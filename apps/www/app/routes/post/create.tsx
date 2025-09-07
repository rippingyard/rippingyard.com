import clsx from 'clsx';
import { Timestamp } from 'firebase-admin/firestore';
import { useEffect } from 'react';
import { data, redirect } from 'react-router';
import { useLoaderData, useLocation, useNavigate } from 'react-router';

import { PostEditor } from '~/features/postEditor';
import { clearCachedItems } from '~/hooks/cache/useCache';
import { useCachedContent } from '~/hooks/cache/useCachedContent';
import { useMyTags } from '~/hooks/fetch/useMyTags.server';
import { usePostFormData } from '~/hooks/form/usePostFormData';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useCanCreatePost } from '~/hooks/permission/useCanCreatePost';
import { useSavePost } from '~/hooks/save/useSavePost.server';
import { translation } from '~/middlewares/i18n/translation.server';
import { commitSession, getMe, getSession } from '~/middlewares/session.server';
import { containerStyle, edgeStyle } from '~/styles/container.css';

import type { Route } from './+types/create';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { t } = await translation(request);

    const title = t('post.create');
    const canonicalUrl = new URL('post/create', request.url).toString();

    // 権限確認
    const { uid, role } = await getMe(request);
    const canCreatePost = useCanCreatePost();

    if (!uid || !canCreatePost(role)) {
      const session = await getSession(request.headers.get('Cookie'));
      session.flash('alertMessage', t('error.noPermission'));
      return redirect('/login', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }

    const myTags = await useMyTags({ uid });

    return {
      title,
      canonicalUrl,
      myTags,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    };
  } catch (e) {
    console.error(e);
    throw new Response('Not Found', { status: 404 });
  }
};

export const action = async ({ request }: Route.ActionArgs) => {
  const savePost = useSavePost();
  const postLink = usePostLink();

  try {
    const { uid } = await getMe(request);
    const { t } = await translation(request);

    if (!uid) throw new Error('Unauthenticated');

    const session = await getSession(request.headers.get('Cookie'));

    const formData = await usePostFormData(request);

    const { post } = await savePost({
      publishedAt: Timestamp.now(),
      uid,
      ...formData,
    });

    console.log('saved!', post);

    const permalink = postLink(post.id!);

    session.flash(
      'infoMessage',
      `<a href="${permalink}">${t('info.posted')}</a>`
    );

    return data(
      {
        post,
      },
      {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      }
    );
  } catch (e) {
    console.error(e);
    return data(e, {
      status: 400,
    });
  }
};

export const meta = ({ data }: Route.MetaArgs) => {
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

export default function Main({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const postLink = usePostLink();
  const { pathname } = useLocation();
  const { myTags } = useLoaderData<typeof loader>();
  const { clearCachedContent } = useCachedContent();

  useEffect(() => {
    if (!actionData?.post) return;

    clearCachedContent(pathname);
    clearCachedItems();

    const permalink = postLink(actionData.post.id!);

    navigate(permalink);
  }, [clearCachedContent, navigate, pathname, postLink, actionData]);

  return (
    <main className={clsx(containerStyle, edgeStyle)}>
      <PostEditor myTags={myTags} />
    </main>
  );
}
