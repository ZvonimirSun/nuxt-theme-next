import type { MaybeRef } from 'vue'
import dayjs from 'dayjs'

export async function useBlogPosts(currentPage: MaybeRef<number>, pageSize = 10) {
  const page = computed(() => {
    const value = Number(unref(currentPage))
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1
  })

  const { data: allPosts } = await useAsyncData('blog:posts:all', () => {
    return queryCollection('content')
      .where('path', 'LIKE', '/posts/%')
      .all()
  })

  const sortedPosts = computed(() => {
    const list = (allPosts.value ?? []).map((post) => {
      const date = dayjs(post.date)
      const updated = post.updated ? dayjs(post.updated) : null

      const path = (post.permalink || post.path).trim()
      const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
      const permalink = withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`

      return {
        ...post,
        permalink,
        datetime: date.format('YYYY-MM-DD HH:mm:ss'),
        date: date.format('YYYY-MM-DD'),
        updatedTime: updated ? updated.format('YYYY-MM-DD HH:mm:ss') : null,
        updated: updated ? updated.format('YYYY-MM-DD') : null,
      }
    })

    return list.sort((a, b) => {
      const aTime = a.date ? Date.parse(a.datetime) : 0
      const bTime = b.date ? Date.parse(b.datetime) : 0

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
