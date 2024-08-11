import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
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
import { usePost } from '~/hooks/fetch/usePost.server';
import { usePostFormData } from '~/hooks/form/usePostFormData';
import { usePostEditLink } from '~/hooks/link/usePostEditLink';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useCanEditPost } from '~/hooks/permission/useCanEditPost.server';
import { useSavePost } from '~/hooks/save/useSavePost.server';
import { getMe } from '~/middlewares/session.server';
import { containerStyle, edgeStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { postId } = params;

  const canEditPost = useCanEditPost();

  try {
    if (!postId) throw new Error();

    const title = '記事編集';
    const action = usePostEditLink(postId);
    const canonicalUrl = new URL(action, request.url).toString();

    const { post } = await usePost(postId, request);
    if (!post) throw new Error();

    const { uid, role } = await getMe(request);
    if (!uid) return redirect('/');
    if (!canEditPost(uid, role, post)) return redirect('/');

    return json({
      post,
      action,
      title,
      canonicalUrl,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    });
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  const savePost = useSavePost();

  try {
    const { postId } = params;
    if (!postId) throw new Error();

    const { post } = await usePost(postId, request);
    if (!post) throw new Error();

    const { uid } = await getMe(request);
    if (!uid) throw new Error('Unauthenticated');

    const { title, contentBody, type, status, isPublic } =
      await usePostFormData(request);

    const createdAt = Timestamp.fromDate(post.createdAt.toDate());
    const publishedAt = Timestamp.fromDate(post.publishedAt.toDate());

    const { post: newPost } = await savePost({
      id: post.id,
      title,
      contentBody,
      uid,
      type: type || post.type,
      status: status || post.status,
      createdAt,
      publishedAt,
      isPublic: isPublic !== undefined ? isPublic : post.isPublic,
    });

    return json({
      post: newPost,
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
  const { post, action } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const postLink = usePostLink();

  const result = useActionData<typeof action>();

  useEffect(() => {
    if (!result?.post) return;
    clearCachedItems();
    return navigate(postLink(result.post.id));
  }, [navigate, postLink, result]);

  return (
    <main className={clsx(containerStyle, edgeStyle)}>
      <PostEditor post={post} action={action} />
    </main>
  );
}
