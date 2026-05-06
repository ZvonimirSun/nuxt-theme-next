<script setup lang="ts">
definePageMeta({
  path: '/page/:page/',
  layout: false,
})
const is404 = await useBlog404()
if (is404.value) {
  if (import.meta.server) {
    throw createError({
      statusCode: 404,
    })
  }
}
</script>

<template>
  <NuxtLayout v-if="!is404" name="page" class="index">
    <ThemePageList />
  </NuxtLayout>
  <ThemePage404 v-else />
</template>
