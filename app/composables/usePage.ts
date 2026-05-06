export async function usePage() {
  const route = useRoute()
  const { data: page } = await useAsyncData(
    `blog:page:${route.path}`,
    () => queryCollection('pages')
      .path(route.path)
      .first(),
  )
  return page
}
