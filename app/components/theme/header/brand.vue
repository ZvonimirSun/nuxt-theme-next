<script lang="ts" setup>
const { title, subtitle } = usePublicConfig()
</script>

<template>
  <div class="bg-theme flex px-2.5 shrink-0 site-brand-container">
    <div class="flex flex-col gap-4 items-center py-5 grow text-center site-meta">
      <ULink to="/" class="brand">
        <i class="logo-line" />
        <h1 class="w-fit text-2xl text-white site-title">
          {{ title }}
        </h1>
        <i class="logo-line" />
      </ULink>
      <p v-if="subtitle" class="text-white/60 text-sm site-subtitle">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
