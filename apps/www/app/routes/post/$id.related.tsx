import { Document } from '@langchain/core/documents';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { Suspense, useMemo } from 'react';
import { Await, useLoaderData } from 'react-router';

import { Heading } from '~/components/Heading';
import { Link } from '~/components/Link';
import { PostTags } from '~/components/PostTags';
import { Loading } from '~/features/loading';
import { PostHeader } from '~/features/postHeader';
import { PostList } from '~/features/postList';
import { useNearestPosts } from '~/hooks/fetch/useNearestPosts.server';
import { usePost } from '~/hooks/fetch/usePost.server';
import { usePosts } from '~/hooks/fetch/usePosts.server';
import { useUser } from '~/hooks/fetch/useUser.server';
import { usePostEditLink } from '~/hooks/link/usePostEditLink';
import { usePostLink } from '~/hooks/link/usePostLink';
import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { useCanEditPost } from '~/hooks/permission/useCanEditPost.server';
import { getMe } from '~/middlewares/session.server';
import { containerStyle } from '~/styles/container.css';
import { articleFooterStyle, articleSectionStyle } from '~/styles/section.css';
import { getSummary, getThumbnailFromText, getTitle } from '~/utils/typography';

import type { Route } from './+types/$id';

// GPTに渡すテンプレート
const systemPromptTemplate = `
あなたは優秀なアシスタントです。
ユーザーから本文と関連項目が入力されるので、それを参考に質問に答えてください。
返り値は、JSONフォーマットになります。
言語は、本文の言語に合わせてください。

質問文:
1. 本文を要約してください（summary）
2. 関連項目と照らし合わせて、この著者の次に興味を抱きそうな芸術作品（映画、音楽、文学など）を最大10件提案してください（items[]）。itemは、それぞれ、名称（name）、ジャンル（genre）、80字程度の簡単な説明文（description）をプロパティとするオブジェクトになります。
3. 関連項目と照らし合わせて、この著者が関心を持っていそうな内容を、最大20個程度のタグとして提案してください（tags[]）
`;

const humanPromptTemplate = `# 本文
{content}

# 関連項目
{context}`;

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  try {
    const { id } = params;
    const canEditPost = useCanEditPost();
    const postLink = usePostLink();

    if (!id) throw new Error();

    const { post } = await usePost(id, request);
    if (!post) throw new Error();

    const { data: nextPosts } = await usePosts({
      limit: 5,
      startAfter: post.publishedAt,
    });

    const path = postLink(post.id);
    const canonicalUrl = new URL(path, request.url).toString();
    const { uid, role } = await getMe(request);

    const { user: owner } = await useUser(post?.owner?.id || '');

    const { data: nearestPosts } = await useNearestPosts(post.content, {
      limit: 16,
    });
    // console.log('nearestPosts', nearestPosts);

    // OpenAIのChat APIを使ったLLMを生成
    const llm = new ChatOpenAI({
      model: 'gpt-4o',
      temperature: 0.5,
      apiKey: import.meta.env.VITE_OPENAI_APIKEY,
    });

    // 結果をLangChainが扱いやすい形式(Document)に変換
    const documents = nearestPosts
      .filter((p) => p.id !== post.id)
      .map((p) => new Document({ pageContent: p.content }));

    // LangChainを使って、質問に対する回答を取得
    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(systemPromptTemplate),
      HumanMessagePromptTemplate.fromTemplate(humanPromptTemplate),
    ]);

    const parser = new JsonOutputParser<{
      summary: string;
      items: {
        name: string;
        genre: string;
        description: string;
      }[];
      tags: string[];
    }>();
    console.log('parser', parser);
    // .asTool({
    //   name: '',
    //   schema: z.string()
    // });
    // const instructions = parser.getFormatInstructions();
    // console.log('instruction', instructions);

    const documentChain = await createStuffDocumentsChain({ llm, prompt });
    const org = await documentChain.invoke({
      content: post.content,
      context: documents,
    });
    const answer = await parser.invoke(org);

    return {
      post,
      nearestPosts: nearestPosts.filter((p) => p.id !== post.id),
      answer,
      owner,
      nextPosts,
      canonicalUrl,
      canEditPost: canEditPost(uid, role, post),
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    };
  } catch (e) {
    console.error(e);
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta = ({ data }: Route.MetaArgs) => {
  if (!data) return [];
  const { post, canonicalUrl } = data;

  const title = getTitle(post.content, {
    alt: useDate(
      post.publishedAt as unknown as TimestampType,
      'YYYY年MM月DD日の記録'
    ),
    // level: 1,
  });
  const summary = getSummary(post.content, 340);
  const thumbnail = getThumbnailFromText(post.content);
  const description = getSummary(post.content, 140);
  const htmlTitle = `${title} - related posts - rippingyard`;
  const image = thumbnail || '/images/ogimage.png';

  return [
    { title: htmlTitle },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { name: 'description', content: description },
    { property: 'og:title', content: htmlTitle },
    { property: 'og:description', content: summary },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    { name: 'twitter:title', content: htmlTitle },
    { name: 'twitter:description', content: summary },
    { name: 'twitter:image', content: image },
    { name: 'twitter:card', content: 'summary' },
  ];
};

export default function Main() {
  const { post, nearestPosts, canEditPost, answer } =
    useLoaderData<typeof loader>();

  const hasNext = useMemo(() => nearestPosts.length > 0, [nearestPosts.length]);
  const editLink = usePostEditLink(post.id);

  return (
    <>
      <Heading>Post</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={post}>
            <section className={articleSectionStyle}>
              <p>要約：{answer.summary}</p>
              <div>
                関連項目：
                <ul>
                  {answer?.items.map((item) => (
                    <li>
                      <h3>
                        {item.name} - {item.genre}
                      </h3>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                タグ：
                <ul>{answer?.tags.map((tag) => <li>{tag}</li>)}</ul>
              </div>

              <PostHeader post={post} />
              {post?.tags && (
                <div className={articleSectionStyle}>
                  <PostTags tags={post?.tags || []} />
                </div>
              )}

              {canEditPost && (
                <div className={articleFooterStyle}>
                  <Link to={editLink} size="x-small" isButton isBold>
                    編集
                  </Link>
                </div>
              )}
            </section>
            {hasNext && (
              <>
                <Heading level="partial">関連記事</Heading>
                <PostList posts={nearestPosts} />
              </>
            )}
          </Await>
        </Suspense>
      </main>
    </>
  );
}
