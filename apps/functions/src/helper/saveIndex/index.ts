import type { PostAsSearchResult } from '@rippingyard/schemas';
import algoliasearch from 'algoliasearch';
import { defineSecret } from 'firebase-functions/params';

type SecretParam = ReturnType<typeof defineSecret>;

function init(indexName: string, apiId: SecretParam, apiKey: SecretParam) {
  console.log('algolia setting', apiId.value());
  if (!apiId.value()) return;
  const client = algoliasearch(
    apiId.value(),
    apiKey.value(),
  );
  return client.initIndex(indexName);
}

async function save<T>(indexName: 'posts', object: T, apiId: SecretParam, apiKey: SecretParam) {
  console.log('save a document', object);

  const index = init(indexName, apiId, apiKey);
  if (!index) return;

  await index.saveObject(object);
}

export async function savePostIndex(payload: PostAsSearchResult, apiId: SecretParam, apiKey: SecretParam) {
  await save<PostAsSearchResult>('posts', payload, apiId, apiKey);
}

export async function destroy(indexName: string, id: string, apiId: SecretParam, apiKey: SecretParam) {
  console.log('delete a document', id);

  const index = init(indexName, apiId, apiKey);
  if (!index) return;

  await index.deleteObject(id);
}
