import { Activity } from '~/types/activity'
import { getTitle } from '~/plugins/typography'

export function activityMessage(activity: Activity) {
  if (!activity.type) return '詳細不明'
  switch (activity.type) {
    case 'comment:create':
      return 'コメントしました'
    case 'comment:update':
      return 'コメントを更新しました'
    case 'comment:delete':
      return 'コメントを削除しました'
    case 'post:create':
      return '記事を書きました'
    case 'post:update':
      return '記事を更新しました'
    case 'post:delete':
      return '記事を削除しました'
    case 'follow':
      return 'フォローしました'
    case 'followed':
      return 'フォローされました'
  }
  return '活動しました'
}

export function activityContent(activity: Partial<Activity>): string {
  if (!activity.payload) return ''

  let message = ''

  if (activity.payload.content) {
    message = getTitle(activity.payload.content)
  }

  return message
}

export function activityLink(activity: Partial<Activity>): string {

  if (!activity.payload) return '/'

  let link = '/'

  if (activity.type === 'comment:create') {
    console.log('Parent', activity.payload.parent.parent.id)
    switch (activity.payload.parent.parent.id) {
      case 'posts':
        link = `/post/${activity.payload.parent.id}`
        break
      case 'entities':
        link = `/entity/${activity.payload.parent.id}`
        break
    }
  }

  if (activity.type === 'post:create') {
    // console.log('Parent', activity.payload.parent.parent.id)
    link = `/post/${activity.payload.id}`
  }

  console.log('Link', activity.payload)

  return link
}
