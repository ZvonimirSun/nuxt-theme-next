<script lang="ts" setup>
import type { MenuItem } from '#layers/nuxt-theme-next/app/types/menu'

const {
  menu,
  search: {
    enable,
  },
} = usePublicConfig()

const menuItems = computed(() => menu as MenuItem[])
</script>

<template>
  <nav class="site-nav">
    <ul v-if="menuItems.length" class="py-4 main-menu menu">
      <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
        <UButton
          color="neutral"
          variant="link"
          :to="item.to"
          :icon="item.icon"
          size="sm"
          class="hover:bg-menu-item h-9 text-default gap-2 text-base px-5 flex menu-link rounded-none"
          active-class="menu-item-active bg-menu-item"
          :label="item.label"
        />
      </li>
      <li v-if="enable" class="menu-item">
        <UContentSearchButton
          color="neutral"
          variant="link"
          size="sm"
          class="w-full cursor-pointer hover:bg-menu-item h-9 text-default gap-2 text-base px-5 flex menu-link rounded-none"
          active-class="menu-item-active bg-menu-item"
        >
          搜索
        </UContentSearchButton>
        <ThemePartSearch />
      </li>
    </ul>
  </nav>
</template>
