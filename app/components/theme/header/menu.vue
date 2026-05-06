<script lang="ts" setup>
const navItems = [
  { label: '首页', icon: 'lucide:home', to: '/' },
  { label: '标签', icon: 'lucide:tags', to: '/tags/' },
  { label: '归档', icon: 'lucide:archive', to: '/archives/' },
  { label: '友链', icon: 'lucide:link', to: '/links/' },
]
</script>

<template>
  <nav class="site-nav">
    <ul class="py-4 main-menu menu">
      <li v-for="(item, index) in navItems" :key="index" class="menu-item">
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
      <li class="menu-item">
        <UContentSearchButton
          color="neutral"
          variant="link"
          size="sm"
          class="w-full cursor-pointer hover:bg-menu-item h-9 text-default gap-2 text-base px-5 flex menu-link rounded-none"
          active-class="menu-item-active bg-menu-item"
        >
          搜索
        </UContentSearchButton>
      </li>
    </ul>
    <ThemeHeaderSearch />
  </nav>
</template>
