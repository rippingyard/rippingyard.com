import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import algoliasearch from 'algoliasearch/lite';

import { SearchForm } from '~/components/SearchForm';
import { SearchResult } from '~/features/searchResult';
import { PostAsSearchResult } from '~/schemas/post';
import { containerStyle } from '~/styles/container.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  console.log('query', query);

  if (!query)
    return json({
      posts: [],
    });

  const searchClient = algoliasearch(
    process.env.VITE_ALGOLIA_APPID!,
    process.env.VITE_ALGOLIA_APIKEY!
  ).initIndex('posts');

  const result = await searchClient.search<PostAsSearchResult>(query, {
    facetFilters: ['status:published', 'isDeleted:false', 'isPublic:true'],
  });

  const { hits } = result;

  return json({
    posts: hits,
    query: query || '',
  });
};

export default function Index() {
  const { posts, query } = useLoaderData<{
    posts: PostAsSearchResult[];
    query: string;
  }>();
  console.log('posts', posts);

  return (
    <main className={containerStyle}>
      <SearchForm query={query} />
      <SearchResult posts={posts} query={query} />
    </main>
  );
}
