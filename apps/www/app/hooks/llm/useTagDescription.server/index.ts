import { ChatAnthropic } from '@langchain/anthropic';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { useCache } from '~/hooks/fetch/useCache.server';
import { useSaveCache } from '~/hooks/save/useSaveCache.server';

// import { basicPrompt } from '@rippingyard/resources';

export type Description = {
  summary: string;
  relatedTags: string[];
};

const VERSION = '0.2.0';

const basicPrompt = `# 全体のルール

- 過度に性的な発言、過度に暴力的な発言、差別的な発言は絶対に行わないこと
- 個人情報に関わるような内容を返さないこと`;

const template = `
# 概要
ユーザーは、タグについての情報を知りたいと考えています。そこで、あなたはキュレーターとして、このサービスが持っている情報に基づいてユーザーに適切な解説と、関連するワードをタグとして5〜10個程度返してください。

# 入力情報
- タグ名: {tag}
- 関連する記事の本文: {contents}

# 出力形式: JSON
- summary: 200〜300字程度の解説文
- relatedTags: 5から10個程度の関連タグ

# ルール
- このサービスのことを解説するのではなく、あくまでこのタグが持つ意味や背景、関連する情報について解説し、その中で関連する記事の内容を適宜参照するようにする
- 解説に、入力文（タグ）を含める必要はありません。純粋に解説の本文のみを記載してください
- 文体については、関連する記事の本文を参考にすること。敬語で説明するのではなく、ある程度カジュアルな批評言語を用いること
- 解説は、適度な改行を入れつつ、200〜300字程度で簡潔にまとめること
- 関連タグは、このサービスのユーザーが、次に興味を持ちそうなものを選択すること
`;

const fetchTagDescription = async (tag: string, contents?: string[]) => {
  const cacheKey = `tag-description-${VERSION}-${tag}`;
  const cache = await useCache<Description>(cacheKey);
  const { saveCache } = useSaveCache();

  let description: Description;
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
    // const outputParser = new StringOutputParser();
    const outputParser = new JsonOutputParser<Description>();

    //     // 結果をLangChainが扱いやすい形式(Document)に変換
    //     const documents = nearestPosts
    //       .filter((p) => p.id !== post.id)
    //       .map((p) => new Document({ pageContent: p.content }));

    // LangChainを使って、質問に対する回答を取得
    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(basicPrompt),
      HumanMessagePromptTemplate.fromTemplate(template),
    ]);
    const chain = prompt.pipe(llm).pipe(outputParser);

    description = await chain.invoke({
      tag,
      contents: contents?.slice(0, 10).join('\n\n') || '',
    });

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
