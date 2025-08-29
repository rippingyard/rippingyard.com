import algoliasearch from 'algoliasearch/lite';
import { useLoaderData } from 'react-router';

import { SearchForm } from '~/components/SearchForm';
import { SearchResult } from '~/features/searchResult';
import { containerStyle } from '~/styles/container.css';

import type { PostAsSearchResult } from '@rippingyard/schemas';

import type { Route } from './+types/search';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  console.log('query', query);

  if (!query)
    return {
      posts: [],
      title: '検索',
      canonicalUrl: new URL('search', request.url).toString(),
    };

  const searchClient = algoliasearch(
    process.env.VITE_ALGOLIA_APPID!,
    process.env.VITE_ALGOLIA_APIKEY!
  ).initIndex('posts');

  const result = await searchClient.search<PostAsSearchResult>(query, {
    facetFilters: ['status:published', 'isDeleted:false', 'isPublic:true'],
  });

  const { hits } = result;

  const title = `「${query}」の検索結果`;
  const canonicalUrl = new URL(`search?=${query}`, request.url).toString();

  return {
    posts: hits,
    query: query || '',
    title,
    canonicalUrl,
  };
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
