import type { PostAsSearchResult } from '@rippingyard/schemas';
import algoliasearch from 'algoliasearch';
import { defineSecret } from 'firebase-functions/params';

const algoliaApiId = defineSecret('ALGOLIA_APPID');
const algoliaApiKeyAdmin = defineSecret('ALGOLIA_APIKEYADMIN');

function init(indexName: string) {
  console.log('algolia setting', algoliaApiId);
  if (!algoliaApiId) return;
  const appId = algoliaApiId as unknown as string;
  const apiKeyAdmin = algoliaApiKeyAdmin as unknown as string;
  const client = algoliasearch(appId, apiKeyAdmin);
  return client.initIndex(indexName);
}

async function save<T>(indexName: 'posts', object: T) {
  console.log('save a document', object);

  const index = init(indexName);
  if (!index) return;

  await index.saveObject(object);
}

export async function savePostIndex(payload: PostAsSearchResult) {
  await save<PostAsSearchResult>('posts', payload);
}

export async function destroy(indexName: string, id: string) {
  console.log('delete a document', id);

  const index = init(indexName);
  if (!index) return;

  await index.deleteObject(id);
}
