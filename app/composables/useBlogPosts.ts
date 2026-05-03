import type { MaybeRef } from 'vue'
import type { BlogPost } from '~/types/post'
import { computed, unref } from 'vue'

export async function useBlogPosts(currentPage: MaybeRef<number>, pageSize = 10) {
  const page = computed(() => {
    const value = Number(unref(currentPage))
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1
  })

  const { data: allPosts } = await useAsyncData('blog:posts:all', () => {
    return queryCollection('content')
      .where('path', 'LIKE', '/posts/%')
      .all() as Promise<BlogPost[]>
  })

  const sortedPosts = computed(() => {
    const list = (allPosts.value ?? []).map((post: BlogPost) => {
      const path = (post.permalink || post.path).trim()
      const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
      post.permalink = withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`

      return post
    })

    return list.sort((a, b) => {
      const aTime = a.date ? Date.parse(a.date) : 0
      const bTime = b.date ? Date.parse(b.date) : 0

      if (bTime !== aTime) {
        return bTime - aTime
      }

      return a.path.localeCompare(b.path)
    })
  })

  const totalPosts = computed(() => sortedPosts.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalPosts.value / pageSize)))
  const safePage = computed(() => Math.min(page.value, totalPages.value))

  const posts = computed(() => {
    const start = (safePage.value - 1) * pageSize
    return sortedPosts.value.slice(start, start + pageSize)
  })

  return {
    posts,
    page: safePage,
    totalPosts,
    totalPages,
  }
}
