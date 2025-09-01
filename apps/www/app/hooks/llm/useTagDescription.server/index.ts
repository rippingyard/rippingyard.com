import { ChatAnthropic } from '@langchain/anthropic';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';

const template = `
{tag}について知っていることを教えて下さい
`;

const fetchTagDescription = async (tag: string) => {
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

  const org = await chain.invoke({
    tag,
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

  console.log('result', org);
  return org;
  //     const answer = await parser.invoke(org);
};

export const useTagDescription = () => {
  return {
    fetchTagDescription,
  };
};
