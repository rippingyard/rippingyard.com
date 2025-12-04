import { ChatAnthropic } from '@langchain/anthropic';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';

import { SuggestedCategory } from '~/features/postEditor/settingModal';
import { usePost } from '~/hooks/fetch/usePost.server';
import { useSavePost } from '~/hooks/save/useSavePost.server';
import { translation } from '~/middlewares/i18n/translation.server';
import { getMe } from '~/middlewares/session.server';
import { getSummary } from '~/utils/typography';

import { Route } from './+types/suggestion';

export type Suggestion = {
  summary: string;
  suggestedCategory: SuggestedCategory[];
  suggestedTags: string[];
};

export const mockedEntities = [
  'Music',
  'Film',
  'Book',
  'Art',
  'Game',
  'Technology',
];

const systemPrompt = `# 全体のルール

- 過度に性的な発言、過度に暴力的な発言、差別的な発言は絶対に行わないこと
- 個人情報に関わるような内容を返さないこと`;

const template = `
# 概要
ユーザーは、記事の本文から推測されるタグと要約文を抽出したいと考えています。そこで、あなたは編集者として、本文を参考に、以下の作業を行ってください。

- 記事の要約
- 関連すると推測されるキーワードをタグとして10〜20個程度返してください
- この文章が以下のどのカテゴリーに当てはまるか判定してください。複数判定ありで、どれにも当てはまらない場合は空の配列を返してください。

film: 映画に関連する文章
music: 音楽に関連する文章
book: 文学に関連する文章
art: 主に視覚芸術に関連する文章
game: ゲームに関連する文章
politic: 政治に関連する文章
food: 食に関連する文章

# 入力情報
- 記事の本文: {content}

# 出力形式: JSON
- summary: 200〜300字程度の要約文
- suggestedCategories: 上記のカテゴリに当てはまるものを配列で返します
- suggestedTags: 10〜15個程度の、本文に関連していると推測されるタグ

# ルール
- 要約は、適度な改行を入れつつ、200〜300字程度で簡潔にまとめること
- 文体については、関連する記事の本文を参考にすること。敬語で説明するのではなく、ある程度カジュアルな批評言語を用いること
- タグは、このサービスのユーザーが、次に興味を持ちそうなものを選択すること
- タグは、鉤括弧（「」『』など）で囲まれているものや、固有名詞を優先的に扱います（作品名などで鉤括弧がついている場合はそれを外してください）
`;

// 各エンティティについて、文章全体に対する関連度を0〜1.00で算出し、可能であれば上記カテゴリに当てはまるものを配列で設定します。

// これらを以下のJSON形式で返してください

// {
//   categories: string[], // 上記1のカテゴリに当てはまるものを配列で返します
//   entities:{
//     value: string,//エンティティ文字列
//     relevance: number,//関連度を0〜1.00で
//     categories: string[],//上記カテゴリから当てはまるものを配列で
//   }[], //上記2のエンティティを配列で返します
// }

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  // 認証チェック
  const { uid } = await getMe(request);
  const { t } = await translation(request);
  const savePost = useSavePost();

  if (!uid) {
    return Response.json({
      summarizedContent: '',
      summary: '',
      suggestedCategory: [],
      suggestedTags: [],
    });
  }

  const { id } = params;

  const { post } = await usePost(id, request);
  if (!post) throw new Error(t('error.notFound'), { cause: 404 });

  const { content } = post;

  const summarizedContent = getSummary(content, 4000);

  // Anthropic ClaudeのChat APIを使ったLLMを生成
  const llm = new ChatAnthropic({
    model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022',
    temperature: 0.5,
    apiKey: import.meta.env.ANTHROPIC_API_KEY,
  });
  const outputParser = new JsonOutputParser<Suggestion>();

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(systemPrompt),
    HumanMessagePromptTemplate.fromTemplate(template),
  ]);
  const chain = prompt.pipe(llm).pipe(outputParser);

  const suggestion = await chain.invoke({
    content: summarizedContent,
  });

  const body = {
    summarizedContent,
    ...suggestion,
  };

  if (body?.suggestedTags) {
    await savePost({
      id: post.id,
      contentBody: post.content,
      // tags: post.tags,
      uid: post.owner.id,
      suggestedTags: body?.suggestedTags.map((t) => {
        return {
          value: t,
          relevance: 1,
        };
      }),
    });
  }

  return Response.json({
    ...body,
  });
};
