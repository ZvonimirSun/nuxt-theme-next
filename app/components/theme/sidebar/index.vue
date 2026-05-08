<script lang="ts" setup>
const {
  author,
  description,
  avatar,
  toc,
} = usePublicConfig()

const { total } = await usePosts()
const route = useRoute()
const activeTab = ref<'toc' | 'site'>('site')
const sidebarTabs = [
  { label: '文章目录', value: 'toc', slot: 'toc' },
  { label: '站点概览', value: 'site', slot: 'site' },
]

interface TocLink {
  id: string
  text?: string
  title?: string
  depth?: number
  children?: TocLink[]
}

interface TocEntry {
  id: string
  text: string
  depth: number
}

const { data: currentPost } = await useAsyncData(
  `sidebar:post:${route.path}`,
  () => queryCollection('content')
    .where('permalink', '=', route.path)
    .first(),
  {
    watch: [() => route.path],
  },
)

const { data: currentPage } = await useAsyncData(
  `sidebar:page:${route.path}`,
  () => queryCollection('pages')
    .path(route.path)
    .first(),
  {
    watch: [() => route.path],
  },
)

const tocLinks = computed<TocLink[]>(() => {
  const current = currentPost.value || currentPage.value
  return current?.body?.toc?.links || []
})

const flatTocLinks = computed<TocEntry[]>(() => {
  function flatten(links: TocLink[], fallbackDepth = 2): TocEntry[] {
    return links.flatMap((link) => {
      const depth = link.depth || fallbackDepth
      const text = link.text || link.title || ''
      const current = link.id && text
        ? [{ id: link.id, text, depth }]
        : []
      return [
        ...current,
        ...flatten(link.children || [], depth + 1),
      ]
    })
  }

  return flatten(tocLinks.value)
})

const hasSiteInfo = computed(() => {
  return Boolean(avatar.url || author || description)
})

const hasToc = computed(() => {
  return Boolean(toc.enable && flatTocLinks.value.length)
})

watch([hasToc, () => route.path], ([value]) => {
  activeTab.value = value ? 'toc' : 'site'
}, { immediate: true })
</script>

<template>
  <aside class="bg-content shadow-lg mt-4 sticky top-4 sidebar">
    <UTabs
      v-if="hasToc"
      v-model="activeTab"
      :items="sidebarTabs"
      variant="link"
      color="neutral"
      size="sm"
      :ui="{
        root: 'gap-0 site-sidebar-tabs',
        list: 'p-0 rounded-none border-default',
        trigger: 'rounded-none py-3',
        indicator: 'bg-inverted',
        content: 'w-full',
      }"
    >
      <template #toc>
        <nav
          class="px-5 py-4 site-toc"
          aria-label="文章目录"
        >
          <ul class="flex flex-col gap-1 site-toc-list">
            <li v-for="link in flatTocLinks" :key="link.id" class="site-toc-item">
              <ULink
                :to="`#${link.id}`"
                class="block truncate text-muted hover:text-default text-sm/7 site-toc-link"
                :style="{ paddingLeft: `${Math.max(link.depth - 2, 0) * 12}px` }"
              >
                {{ link.text }}
              </ULink>
            </li>
          </ul>
        </nav>
      </template>

      <template #site>
        <div class="site-sidebar-panel">
          <div v-if="hasSiteInfo" class="px-5 py-6 text-center site-overview">
            <UAvatar
              v-if="avatar.url"
              :src="avatar.url"
              :alt="author || 'avatar'"
              size="3xl"
              class="mb-4 size-24 site-author-image"
              :ui="{
                root: avatar.rounded ? 'rounded-full' : '!rounded',
              }"
            />
            <p v-if="author" class="font-semibold text-default text-base site-author-name">
              {{ author }}
            </p>
            <p v-if="description" class="mt-2 text-muted text-sm/6 site-description">
              {{ description }}
            </p>
          </div>

          <USeparator />

          <nav class="site-state">
            <ULink to="/" class="block px-5 py-4 text-center hover:bg-menu-item site-state-item">
              <span class="block font-semibold text-default text-xl/6 site-state-item-count">{{ total }}</span>
              <span class="block mt-1 text-muted text-xs site-state-item-name">日志</span>
            </ULink>
          </nav>
        </div>
      </template>
    </UTabs>

    <div v-else class="site-sidebar-panel">
      <div v-if="hasSiteInfo" class="px-5 py-6 text-center site-overview">
        <UAvatar
          v-if="avatar.url"
          :src="avatar.url"
          :alt="author || 'avatar'"
          size="3xl"
          class="mb-4 size-24 site-author-image"
          :ui="{
            root: avatar.rounded ? 'rounded-full' : '!rounded',
          }"
        />
        <p v-if="author" class="font-semibold text-default text-base site-author-name">
          {{ author }}
        </p>
        <p v-if="description" class="mt-2 text-muted text-sm/6 site-description">
          {{ description }}
        </p>
      </div>

      <USeparator />

      <nav class="site-state">
        <ULink to="/" class="block px-5 py-4 text-center hover:bg-menu-item site-state-item">
          <span class="block font-semibold text-default text-xl/6 site-state-item-count">{{ total }}</span>
          <span class="block mt-1 text-muted text-xs site-state-item-name">日志</span>
        </ULink>
      </nav>
    </div>
  </aside>
</template>
