﻿import { json } from '@remix-run/node';
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import algoliasearch from 'algoliasearch/lite';

import { SearchForm } from '~/components/SearchForm';
import { SearchResult } from '~/features/searchResult';
import { PostAsSearchResult } from '~/schemas/post';
import { containerStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  console.log('query', query);

  if (!query)
    return json({
      posts: [],
      title: '検索',
      canonicalUrl: new URL('search', request.url).toString(),
    });

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

  return json({
    posts: hits,
    query: query || '',
    title,
    canonicalUrl,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
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
