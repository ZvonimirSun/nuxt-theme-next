<script lang="ts" setup>
const { index: { perPage } } = usePublicConfig()

const route = useRoute()
const rawPage = computed(() => {
  return Number.parseInt(String(route.params.page ?? '1'))
})

const { posts, totalPosts, totalPages } = await useBlogPosts(rawPage, perPage)

if (totalPosts.value > 0 && rawPage.value > totalPages.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

function pageChange(newPage: number) {
  const target = newPage === 1 ? '/' : `/page/${newPage}/`
  navigateTo(target)
}
</script>

<template>
  <div class="flex flex-col gap-4 index">
    <div
      v-for="post in posts"
      :key="post.path"
      class="bg-content shadow-lg p-10 post-block"
    >
      <article class="post-content">
        <header class="flex flex-col items-center post-header mb-4">
          <ULink
            :to="post.permalink!"
            class="
              relative text-default
              before:absolute before:w-full before:bottom-0 before:h-0.5 before:bg-inverted
              before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200 before:ease-in-out
            "
          >
            <h2
              class="
                text-3xl/normal text-center w-fit post-title-link
              "
            >
              {{ post.title }}
            </h2>
          </ULink>
          <div class="text-muted text-sm post-meta-container">
            <div class="flex flex-wrap items-center gap-2 post-meta justify-center">
              <span class="flex items-center gap-1 post-meta-item">
                <UIcon name="lucide:calendar" class="post-meta-item-icon" />
                <span class="post-meta-item-text">发表于</span>
                <time
                  class="border-dashed border-b"
                  :title="`创建时间: ${post.datetime}`"
                >{{ post.date }}</time>
              </span>
            </div>
          </div>
        </header>
        <div class="flex flex-col items-center post-body">
          <ContentRenderer class="text-lg/loose w-full" :value="post.meta.excerpt" />
          <UButton
            class="mt-4 cursor-pointer post-button"
            :to="post.permalink!"
            color="neutral"
            variant="outline"
          >
            阅读全文 »
          </UButton>
        </div>
      </article>
    </div>
    <UPagination
      class="self-center p-2 bg-content shadow-lg w-full flex justify-center"
      :page="rawPage"
      :total="totalPosts"
      show-edges
      color="neutral"
      active-color="neutral"
      variant="outline"
      :sibling-count="1"
      @update:page="pageChange"
    />
    <slot />
  </div>
</template>

<style scoped>

</style>
