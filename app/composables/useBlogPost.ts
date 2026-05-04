import dayjs from 'dayjs'

export async function useBlogPost() {
  const route = useRoute()

  const { data: post } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())

  const formattedPost = computed(() => {
    if (!post.value) {
      return null
    }
    const date = dayjs(post.value.date)
    const updated = post.value.updated ? dayjs(post.value.updated) : null

    return {
      ...post.value,
      datetime: date.format('YYYY-MM-DD HH:mm:ss'),
      date: date.format('YYYY-MM-DD'),
      updatedTime: updated ? updated.format('YYYY-MM-DD HH:mm:ss') : null,
      updated: updated ? updated.format('YYYY-MM-DD') : null,
    }
  })

  return {
    post: formattedPost,
  }
}
