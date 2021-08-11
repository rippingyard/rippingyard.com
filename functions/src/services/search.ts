import algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'
// const algoliasearch = require('algoliasearch')

interface SearchObject {
  objectID: string
  title: string
  body: string
  content?: string | undefined
  type: string
  status: string
  image: string | null
  isDeleted: boolean
  isPublic: boolean
  collaborators?: string[]
  entities?: string[] | null
  tokens?: string[] | null
  createdAt: number
  publishedAt: number
  updatedAt: number
  owner: string
}

function init(indexName: string) {
  console.log('debug', functions.config().FIREBASE_CONFIG)
  if (!functions.config().ALGOLIA_CONFIG) return
  const { appId, apiKeyAdmin } = functions.config().ALGOLIA_CONFIG as any
  const client = algoliasearch(appId, apiKeyAdmin)
  return client.initIndex(indexName)
}

export async function save(indexName: string, object: SearchObject) {
  console.log('save a document', object)

  const index = init(indexName)
  if (!index) return

  await index.saveObject(object)
}

export async function destroy(indexName: string, id: string) {
  console.log('delete a document', id)

  const index = init(indexName)
  if (!index) return

  await index.deleteObject(id)
}
