// import * as algoliasearch from 'algoliasearch'
const algoliasearch = require('algoliasearch')

interface SearchObject {
  objectID: string
  title: string
  body: string
  content: string
  type: string
  status: string
  image: string | null
  isDeleted: boolean
  isPublic: boolean
  collaborators: string[]
  entities?: string[] | null
  tokens?: string[] | null
  createdAt: string
  publishedAt: string
  updatedAt: string
  owner: string
}

function init(indexName: string) {
  if (!process.env.ALGOLIA_CONFIG) return
  const { appId, apiKey } = process.env.ALGOLIA_CONFIG as any
  const client = algoliasearch(appId, apiKey)
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
