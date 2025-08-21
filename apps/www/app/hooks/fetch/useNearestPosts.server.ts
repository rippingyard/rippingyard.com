import { OpenAIEmbeddings } from '@langchain/openai';

import { Post } from '~/schemas/post';

import { QueryParams, usePostCondition } from '../condition/usePostConditions';
import { useQuery } from '../firestore/useQuery.server';

export const useNearestPosts = async (
  content: string = '',
  payload: Omit<QueryParams<Post>, 'collection'> = {}
) => {
  const { args: orgArgs, where } = usePostCondition(payload);
  const { limit, ...args } = orgArgs;

  // Firestoreをベクトル検索
  const embeddings = new OpenAIEmbeddings({
    apiKey: import.meta.env.VITE_OPENAI_APIKEY,
  });
  const vector = await embeddings.embedQuery(content);

  return await useQuery<Post>({
    collection: 'posts',
    findNearest: {
      vector,
      limit: limit || 5,
    },
    where,
    ...args,
  });
};
