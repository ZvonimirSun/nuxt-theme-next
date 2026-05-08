import type { FormattedPost } from '#layers/nuxt-theme-next/app/types/post'

export async function usePosts() {
  const { indexGenerator: { perPage } } = usePublicConfig()

  const route = useRoute()
  const isIndexPage = computed(() => route.path === '/' || route.path.startsWith('/page/'))

  const { data: allPosts } = await useAsyncData(
    'blog:posts:all',
    () => queryCollection('content')
      .order('date', 'DESC')
      .all(),
  )
  const formattedPosts = computed<FormattedPost[]>(() => {
    if (!allPosts.value)
      return []
    return allPosts.value.map(formatPost)
  })
  const total = computed<number>(() => formattedPosts.value.length)

  const page = computed<number | null>(() => {
    if (!isIndexPage.value) {
      return null
    }
    const value = Number.parseInt(String(route.params.page ?? '1'))
    return Number.isNaN(value) ? null : value
  })

  const posts = computed<FormattedPost[] | null>(() => {
    if (!page.value) {
      return null
    }
    const start = (page.value - 1) * perPage
    return formattedPosts.value.slice(start, start + perPage)
  })

  return {
    posts,
    page,
    total,
  }
}
