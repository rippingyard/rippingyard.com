import { HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import clsx from 'clsx';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { useEffect } from 'react';
import { data, redirect } from 'react-router';
import { useActionData, useLoaderData, useNavigate } from 'react-router';

import { PostEditor } from '~/features/postEditor';
import { clearCachedItems } from '~/hooks/cache/useCache';
import { useMyTags } from '~/hooks/fetch/useMyTags.server.ts';
import { usePost } from '~/hooks/fetch/usePost.server';
import { usePostFormData } from '~/hooks/form/usePostFormData';
import { usePostEditLink } from '~/hooks/link/usePostEditLink';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useCanEditPost } from '~/hooks/permission/useCanEditPost.server';
import { useSavePost } from '~/hooks/save/useSavePost.server';
import { getMe } from '~/middlewares/session.server';
import { containerStyle, edgeStyle } from '~/styles/container.css';

import { Route } from './+types/$id.edit';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { id: postId } = params;

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

    const myTags = await useMyTags({ uid });

    return {
      post,
      action,
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

export const action = async ({ request, params }: Route.ActionArgs) => {
  const savePost = useSavePost();

  try {
    const { id: postId } = params;
    if (!postId) throw new Error();

    const { post } = await usePost(postId, request);
    if (!post) throw new Error();

    const { uid } = await getMe(request);
    if (!uid) throw new Error('Unauthenticated');

    const { title, contentBody, type, status, tags, isPublic, suggestedTags } =
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
      tags,
      suggestedTags,
      createdAt,
      publishedAt,
      isPublic: isPublic !== undefined ? isPublic : post.isPublic,
    });

    return {
      post: newPost,
    };
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

export default function Main() {
  const { post, action, myTags } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const postLink = usePostLink();

  const result = useActionData<typeof action>();

  useEffect(() => {
    if (!result?.post) return;
    clearCachedItems();
    navigate(postLink(result.post.id));
    return;
  }, [navigate, postLink, result]);

  return (
    <main className={clsx(containerStyle, edgeStyle)}>
      <PostEditor post={post} action={action} myTags={myTags} />
    </main>
  );
}
