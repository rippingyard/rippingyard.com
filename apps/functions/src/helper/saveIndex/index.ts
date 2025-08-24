import { PostAsSearchResult } from '@rippingyard/schemas';
import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';

function init(indexName: string) {
  console.log('algolia setting', functions.config().algolia);
  if (!functions.config().algolia.appid) return;
  const appId: string = functions.config().algolia.appid;
  const apiKeyAdmin: string = functions.config().algolia.apikeyadmin;
  const client = algoliasearch(appId, apiKeyAdmin);
  return client.initIndex(indexName);
}

export async function save(indexName: string, object: PostAsSearchResult) {
  console.log('save a document', object);

  const index = init(indexName);
  if (!index) return;

  await index.saveObject(object);
}

export async function destroy(indexName: string, id: string) {
  console.log('delete a document', id);

  const index = init(indexName);
  if (!index) return;

  await index.deleteObject(id);
}
