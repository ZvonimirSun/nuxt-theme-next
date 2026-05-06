import type { ContentCollectionItem } from '@nuxt/content'
import type { FormattedPost } from '../types/post'
import dayjs from 'dayjs'

export function formatPost(post: ContentCollectionItem): FormattedPost {
  const date = dayjs(post.date)
  const updated = post.updated ? dayjs(post.updated) : null

  return {
    ...post,
    datetime: date.format('YYYY-MM-DD HH:mm:ss'),
    date: date.format('YYYY-MM-DD'),
    updatedTime: updated ? updated.format('YYYY-MM-DD HH:mm:ss') : undefined,
    updated: updated ? updated.format('YYYY-MM-DD') : undefined,
  }
}
