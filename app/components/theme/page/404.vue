<script setup lang="ts">
const { data } = await useAsyncData('404Page', () =>
  queryCollection('pages')
    .path(`/404/`)
    .first(), {
})
</script>

<template>
  <NuxtLayout name="default">
    <ContentRenderer v-if="data" :value="data" :prose="true" />
    <UError
      v-else
      class="h-100 min-h-0"
      :error="{
        statusCode: 404,
        statusMessage: 'Page Not Found',
        message: 'The page you are looking for does not exist.',
      }"
    />
  </NuxtLayout>
</template>
