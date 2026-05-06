import type { ContentCollectionItem } from '@nuxt/content'

export interface FormattedPost extends ContentCollectionItem {
  datetime: string
  updatedTime?: string
}
