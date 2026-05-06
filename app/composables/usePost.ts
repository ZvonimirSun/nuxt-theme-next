export async function usePost() {
  const route = useRoute()

  const { data: post } = await useAsyncData(
    `blog:post:${route.path}`,
    () => queryCollection('content')
      .where('permalink', '=', route.path)
      .first(),
  )

  return computed(() => {
    if (!post.value) {
      return null
    }
    return formatPost(post.value)
  })
}
