<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', async () => {
  const query = await queryCollectionNavigation('content', ['permalink']).order('date', 'DESC')
  const item = query[0]!
  item.title = '文章'
  const result = item.children || []
  result.forEach((item) => {
    item.path = item.permalink as string
  })
  return query
})
const { data: files } = await useAsyncData('search', async () => {
  const query = await queryCollectionSearchSections('content', {
    extraFields: ['permalink'],
  })
  query.forEach((item) => {
    item.id = (item as any).permalink as string
  })
  return query
}, {
  server: false,
})

const searchTerm = ref('')
</script>

<template>
  <LazyUContentSearch
    v-model:search-term="searchTerm"
    :files="files"
    :navigation="navigation"
    :fuse="{ resultLimit: 42 }"
  />
</template>
