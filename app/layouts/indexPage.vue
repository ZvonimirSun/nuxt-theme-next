<script lang="ts" setup>
import dayjs from 'dayjs'

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

function formatDate(input?: string) {
  if (!input)
    return ''

  const value = dayjs(input)

  if (!value.isValid())
    return ''

  return value
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
      class="bg-default shadow-lg p-10 post-block"
    >
      <article class="post-content">
        <header class="flex flex-col items-center post-header mb-15">
          <h2 class="text-3xl/loose w-fit post-title-link">
            <ULink
              :to="post.permalink!"
              class="
                relative text-default
                before:absolute before:w-full before:-bottom-1 before:h-0.5 before:bg-inverted
                before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200 before:ease-in-out
              "
            >
              {{ post.title }}
            </ULink>
          </h2>
          <div class="text-muted text-sm post-meta-container">
            <div class="flex flex-wrap items-center gap-2 post-meta justify-center">
              <span class="flex items-center gap-1 post-meta-item">
                <UIcon name="lucide:calendar" class="post-meta-item-icon" />
                <span class="post-meta-item-text">发表于</span>
                <time
                  class="border-dashed border-b"
                  :title="`创建时间: ${formatDate(post.date)?.format('YYYY-MM-DD HH:mm:ss')}`"
                >{{ formatDate(post.date)?.format('YYYY-MM-DD') }}</time>
              </span>
            </div>
          </div>
        </header>
        <div class="flex flex-col items-center post-body">
          <p class="text-lg/loose w-full">
            {{ post.description }}
          </p>
          <UButton
            class="mt-10 cursor-pointer post-button"
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
      class="self-center p-2 bg-default shadow-lg w-full flex justify-center"
      :page="rawPage"
      :total="totalPosts"
      show-edges
      :sibling-count="1"
      @update:page="pageChange"
    />
    <slot />
  </div>
</template>

<style scoped>

</style>
