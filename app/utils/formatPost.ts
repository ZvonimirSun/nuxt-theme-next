import type { ContentCollectionItem } from '@nuxt/content'
import type { FormattedPost } from '#layers/nuxt-theme-next/app/types/post'

export function formatPost(post: ContentCollectionItem): FormattedPost {
  return {
    ...post,
    datetime: formatDate(post.date, 'datetime'),
    date: formatDate(post.date, 'date'),
    updatedTime: post.updated ? formatDate(post.updated, 'datetime') : undefined,
    updated: post.updated ? formatDate(post.updated, 'date') : undefined,
  }
}
