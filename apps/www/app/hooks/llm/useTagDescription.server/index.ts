import { ChatAnthropic } from '@langchain/anthropic';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { useCache } from '~/hooks/fetch/useCache.server';
import { useSaveCache } from '~/hooks/save/useSaveCache.server';

const VERSION = '0.1.3';

const template = `
# 概要
ユーザーは、タグについての情報を知りたいと考えています。そこで、あなたはキュレーターとして、このサービスが持っている情報に基づいてユーザーに適切な解説を200〜300字程度で返してください。

# 入力情報
- タグ名: {tag}
- 関連する記事の本文: {contents}

# ルール
- このサービスのことを解説するのではなく、あくまでこのタグが持つ意味や背景、関連する情報について解説し、その中で関連する記事の内容を適宜参照するようにする
- 文体については、関連する記事の本文を参考にすること。敬語で説明するのではなく、ある程度カジュアルな批評言語を用いること
- 200〜300字程度で簡潔にまとめること
- 過度に性的な発言、過度に暴力的な発言、差別的な発言は絶対に行わないこと
`;

const fetchTagDescription = async (tag: string, contents?: string[]) => {
  const cacheKey = `tag-description-${VERSION}-${tag}`;
  const cache = await useCache<string>(cacheKey);
  const { saveCache } = useSaveCache();

  let description: string = '';
  if (cache) {
    console.log('hit cache!', cacheKey);
    description = cache;
  } else {
    // Anthropic ClaudeのChat APIを使ったLLMを生成
    const llm = new ChatAnthropic({
      model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      temperature: 0.5,
      apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    });
    const outputParser = new StringOutputParser();

    //     // 結果をLangChainが扱いやすい形式(Document)に変換
    //     const documents = nearestPosts
    //       .filter((p) => p.id !== post.id)
    //       .map((p) => new Document({ pageContent: p.content }));

    // LangChainを使って、質問に対する回答を取得
    const prompt = ChatPromptTemplate.fromMessages([
      HumanMessagePromptTemplate.fromTemplate(template),
    ]);
    const chain = prompt.pipe(llm).pipe(outputParser);

    description = await chain.invoke({
      tag,
      contents: contents?.slice(0, 10).join('\n\n') || '',
    });

    //     const parser = new JsonOutputParser<{
    //       summary: string;
    //       items: {
    //         name: string;
    //         genre: string;
    //         description: string;
    //       }[];
    //       tags: string[];
    //     }>();
    //     console.log('parser', parser);
    //     // .asTool({
    //     //   name: '',
    //     //   schema: z.string()
    //     // });
    //     // const instructions = parser.getFormatInstructions();
    //     // console.log('instruction', instructions);
    // const documentChain = await createStuffDocumentsChain({ llm, prompt });
    // const org = await documentChain.invoke({
    //   tag,
    // });
    //     const answer = await parser.invoke(org);

    console.log('description', description);

    const expiredAt = Timestamp.fromDate(dayjs().add(1, 'week').toDate());

    await saveCache({
      id: cacheKey,
      body: description,
      expiredAt,
    });
  }

  return description;
};

export const useTagDescription = () => {
  return {
    fetchTagDescription,
  };
};
