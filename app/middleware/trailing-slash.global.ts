export default defineNuxtRouteMiddleware((to) => {
  const needsRedirect = [
    /^\/posts\/[^/]+$/,
    /^\/page\/\d+$/,
  ].some(pattern => pattern.test(to.path))

  if (!needsRedirect) {
    return
  }

  const fullPath = to.fullPath || to.path
  const hashIndex = fullPath.indexOf('#')
  const hash = hashIndex >= 0 ? fullPath.slice(hashIndex) : ''
  const pathWithQuery = hashIndex >= 0 ? fullPath.slice(0, hashIndex) : fullPath
  const query = pathWithQuery.slice(to.path.length)
  const target = `${to.path}/${query}${hash}`

  return navigateTo(target, { redirectCode: 301 })
})
