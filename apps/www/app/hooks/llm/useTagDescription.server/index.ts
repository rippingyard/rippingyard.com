import { ChatAnthropic } from '@langchain/anthropic';

export const useTagDescription = () => {
  // Anthropic ClaudeのChat APIを使ったLLMを生成
  const llm = new ChatAnthropic({
    model: 'claude-4o',
    temperature: 0.5,
    apiKey: import.meta.env.VITE_ANTHROPIC_APIKEY,
  });
  //     // 結果をLangChainが扱いやすい形式(Document)に変換
  //     const documents = nearestPosts
  //       .filter((p) => p.id !== post.id)
  //       .map((p) => new Document({ pageContent: p.content }));
  //     // LangChainを使って、質問に対する回答を取得
  //     const prompt = ChatPromptTemplate.fromMessages([
  //       SystemMessagePromptTemplate.fromTemplate(systemPromptTemplate),
  //       HumanMessagePromptTemplate.fromTemplate(humanPromptTemplate),
  //     ]);
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
  //     const documentChain = await createStuffDocumentsChain({ llm, prompt });
  //     const org = await documentChain.invoke({
  //       content: post.content,
  //       context: documents,
  //     });
  //     const answer = await parser.invoke(org);
};
