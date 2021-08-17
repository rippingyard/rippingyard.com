import { DocumentData } from '@firebase/firestore-types'
import { Store } from 'vuex'
import { omit } from 'lodash'
import dayjs from 'dayjs'
import { sanitize, renderWidgets } from '~/plugins/typography'
import { Post } from '~/types/post'
import { getDomain } from '~/plugins/util'

const { decycle } = require('json-cyclic')

interface Params {
  withoutOwner?: boolean
}

export async function normalize(
  id: string,
  post: DocumentData | undefined,
  store: Store<any>,
  params: Params = {
    withoutOwner: false,
  }
): Promise<Partial<Post>> {
  if (!post) return {}

  try {
    let owner: DocumentData = {}
    // TODO: owner.createdAt、owner.updatedAtを正しく処理する
    if (!params.withoutOwner && post.owner) {
      console.log('owner test', post.owner.id)
      const cachedUser = await store.getters['user/one'](post.owner.id)
      if (!cachedUser) {
        try {
          await post.owner?.get().then((doc: any) => {
            // owner = doc.data()
            owner = omit(doc.data(), ['follows', 'followers', 'createdAt', 'updatedAt', 'invitedBy'])
            // console.log(owner)
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
      ...post,
      ...{
        id,
        permalink: permalink(id),
        sociallink: sociallink(id),
        content: filterContent(post.content),
        contentOriginal: post.content,
        // parent: null,

        owner,

        isDeleted: post.isDeleted,

        publishedAt: post.publishedAt
          ? dayjs(post.publishedAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        createdAt: post.createdAt
          ? dayjs(post.createdAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        updatedAt: post.updatedAt
          ? dayjs(post.updatedAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        //   length: getLength(post.content),
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
  return `/post/${id}`
}

export function editlink(post: Partial<Post>): string {
  console.log('EditLink', post);
  const postType = post.type === 'log' ? 'log' : 'post'
  return `/home/${postType}/edit/${post.id}`
}

export function docPath(id: string): string {
  return `posts/${id}`
}

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
