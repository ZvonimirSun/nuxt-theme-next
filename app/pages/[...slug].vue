<script lang="ts" setup>
const is404 = await useBlog404()
if (is404.value) {
  if (import.meta.server) {
    throw createError({
      statusCode: 404,
    })
  }
}
const [post, page] = await Promise.all([usePost(), usePage()])

const pageType = computed(() => {
  if (!post.value) {
    return 'page'
  }
  return 'post'
})
</script>

<template>
  <div v-if="!is404" :class="pageType">
    <NuxtLayout :name="pageType !== 'post' ? pageType : 'default' ">
      <ThemePagePost v-if="post" />
      <ContentRenderer v-else-if="page" :value="page" :prose="true" />
    </NuxtLayout>
  </div>
  <ThemePage404 v-else />
</template>
