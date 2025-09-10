import { OpenAIEmbeddings } from '@langchain/openai';

const embedding = async (content: string) => {
  // Embedding
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_APIKEY,
  });
  // トークン制限対策：最大2000文字に制限（日本語の場合、約4000-6000トークン相当）
  const truncatedContent = content.slice(0, 2000);

  return await embeddings.embedQuery(truncatedContent);
};

export const useEmbedding = () => {
  return { embedding };
};
