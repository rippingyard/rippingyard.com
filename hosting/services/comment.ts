import { DocumentData } from '@firebase/firestore-types'
import { Store } from 'vuex'
import dayjs from 'dayjs'
import { sanitize, renderWidgets } from '~/plugins/typography'
import { Comment } from '~/types/comment'
import { getDomain } from '~/plugins/util'

const { decycle } = require('json-cyclic')

interface Params {
  withoutOwner?: boolean
}

export async function normalize(
  id: string,
  comment: DocumentData | undefined,
  store: Store<any>,
  params: Params = {
    withoutOwner: false,
  }
): Promise<Partial<Comment>> {
  if (!comment) return {}

  try {
    let owner: DocumentData = {}
    // TODO: owner.createdAt、owner.updatedAtを正しく処理する
    if (!params.withoutOwner && comment.owner) {
      const cachedUser = await store.getters['user/one'](comment.owner.id)
      if (!cachedUser) {
        try {
          await comment.owner?.get().then((doc: any) => {
            // owner = omit(doc.data(), ['follows', 'followers'])
            owner = decycle(doc.data())
            // console.log('Owner from firestore')
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
      ...comment,
      ...{
        id,
        permalink: permalink(id),
        sociallink: sociallink(id),
        content: filterContent(comment.content),
        contentOriginal: comment.content,
        // parent: null,

        owner,

        isDeleted: comment.isDeleted,
        
        createdAt: comment.createdAt
          ? dayjs(comment.createdAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        updatedAt: comment.updatedAt
          ? dayjs(comment.updatedAt.toDate()).format('YYYY-MM-DD HH:mm')
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
  return `/comment/${id}`
}

// export function editlink(id: string): string {
//   return `/home/post/edit/${id}`
// }

export function sociallink(id: string): string {
  return getDomain() + permalink(id)
}

export function getStatusLabel(status: string, isPublic: boolean = true): string {
  switch (status) {
    case 'draft':
      return '下書き'
    case 'published':
      return isPublic ? '全世界公開' : '本人限定'
    default:
      return status
  }
}
