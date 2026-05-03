<script setup lang="ts">
definePageMeta({
  // Article route
  path: '/posts/:title/',
  layout: 'post',
})

const route = useRoute()

const postTitle = computed(() => String(route.params.title ?? '').trim())
const postPath = computed(() => `/posts/${postTitle.value}`)
const currentPermalink = computed(() => {
  const path = route.path || '/'
  return path.endsWith('/') ? path : `${path}/`
})

function normalizePermalink(path?: string) {
  if (!path)
    return ''

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const { data: post } = await useAsyncData(
  () => `post:${currentPermalink.value}`,
  async () => {
    const byPath = await queryCollection('content').path(postPath.value).first()
    if (byPath)
      return byPath

    const posts = await queryCollection('content')
      .where('path', 'LIKE', '/posts/%')
      .all() as Array<Record<string, any>>

    return posts.find(item => normalizePermalink(item.permalink) === currentPermalink.value) || null
  },
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}

const postValue = computed(() => post.value as Record<string, any>)
</script>

<template>
  <UContainer class="py-10">
    <ContentRenderer :value="postValue" />
  </UContainer>
</template>
