<script lang="ts" setup>
import { zh_cn } from '@nuxt/ui/locale'

const {
  language,
  title,
  description,
  sidebar: {
    widthDualColumn,
  },
} = usePublicConfig()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: language || 'zh-CN',
  },
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp :locale="zh_cn">
    <div class="bg-black h-0.75 headband" />
    <main class="items-stretch flex gap-4 justify-between mx-auto my-0 w-[calc(100%---spacing(5))] lg:w-6xl 2xl:w-3/4 main">
      <div
        :style="{
          width: `${widthDualColumn}px`,
        }"
        class="column"
      >
        <ThemeHeader />
        <ThemeSidebar />
      </div>
      <div class="flex-1 flex flex-col gap-4 main-inner">
        <slot>
          <NuxtPage />
        </slot>
      </div>
    </main>
    <footer
      :style="{
        paddingLeft: `${widthDualColumn + 16}px`,
      }"
      class="mx-auto my-0 w-[calc(100%---spacing(5))] lg:w-6xl 2xl:w-3/4 footer"
    >
      <ThemeFooter />
    </footer>
  </UApp>
</template>

<style scoped>

</style>
