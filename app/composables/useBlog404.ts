export async function useBlog404() {
  const route = useRoute()
  const [{ posts, page: currentPage }, post, page] = await Promise.all([usePosts(), usePost(), usePage()])
  return computed(() => {
    if (route.path === '/' || route.path.startsWith('/page/')) {
      if (!posts.value || (currentPage.value == null) || (!posts.value.length && currentPage.value > 1)) {
        return true
      }
    }
    else if (post.value) {
      if (post.value.permalink !== route.path) {
        return true
      }
    }
    else if (!page.value) {
      return true
    }

    return false
  })
}
