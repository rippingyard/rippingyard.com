import { DocumentData } from '@firebase/firestore-types'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import { Store } from 'vuex/types/index'
import { sanitize, renderWidgets } from '~/plugins/typography'
import { getDomain } from '~/plugins/util'
import { Item } from '~/types/item'

const { decycle } = require('json-cyclic')

interface Params {
  withoutOwner?: boolean
  withoutItems?: boolean
}

export const itemTypes = [
  { label: '未設定', key: 'unknown' },
  { label: '人物', key: 'person' },
  { label: '組織・グループ', key: 'group' },
  { label: '作品', key: 'work' },
  { label: '場所', key: 'place' },
  { label: '出来事', key: 'event' },
  { label: 'キーワード', key: 'keyword' },
  { label: 'ブックマーク', key: 'bookmark' },
]

export async function normalize(
  id: string,
  item: DocumentData | undefined,
  store: Store<any>,
  params: Params = {
    withoutOwner: false,
    withoutItems: false,
  }
): Promise<Partial<Item>> {
  if (!item) return {}

  try {
    let owner: DocumentData = {}
    // TODO: owner.createdAt、owner.updatedAtを正しく処理する
    if (!params.withoutOwner && item.owner) {
      const cachedUser = await store.getters['user/one'](item.owner.id)
      if (!cachedUser) {
        try {
          await item.owner?.get().then((doc: any) => {
            owner = omit(doc.data(), ['follows', 'followers', 'createdAt', 'updatedAt', 'invitedBy'])
            store.commit('user/setUser', owner)
          })
        } catch (e) {
          console.warn('Error', e)
        }
      } else {
        console.log('Cached!')
        owner = cachedUser
      }
    }

    return decycle({
      ...item,
      ...{
        permalink: permalink(id),
        sociallink: sociallink(id),
        content: filterContent(item.content),
        contentOriginal: item.content,

        owner,

        isDeleted: item.isDeleted,

        createdAt: item.createdAt
          ? dayjs(item.createdAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        updatedAt: item.updatedAt
          ? dayjs(item.updatedAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
      },
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function filterContent(content: string) {
  if (!content) return ''

  content = sanitize(content)
  content = renderWidgets(content)

  return content
}

export function permalink(id: string): string {
  return `/item/${id}`
}

// export function editlink(post: Partial<Item>): string {
//   console.log('EditLink', post);
//   return `/home/${postType}/edit/${post.id}`
// }

export function docPath(id: string): string {
  return `items/${id}`
}

export function sociallink(id: string): string {
  return getDomain() + permalink(id)
}

export function getTypeLabel(key: string): string {
  const itemType = itemTypes.find(t => t.key === key)
  return itemType?.label || '未設定'
}
