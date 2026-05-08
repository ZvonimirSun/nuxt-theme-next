<script lang="ts" setup>
const {
  author,
  footer,
} = usePublicConfig()

const currentYear = new Date().getFullYear()

const copyrightYears = computed(() => {
  const since = Number.parseInt(String(footer.since || ''), 10)
  if (!Number.isNaN(since) && since < currentYear) {
    return `${since} – ${currentYear}`
  }
  return String(footer.since || currentYear)
})

const showIcon = computed(() => {
  return Boolean(footer.icon.enable && footer.icon.name)
})
</script>

<template>
  <div class="py-6 w-full flex flex-col items-center text-muted text-sm/7 footer-inner">
    <p class="flex items-center gap-2 copyright">
      <span>&copy; {{ copyrightYears }}</span>
      <UIcon
        v-if="showIcon"
        :name="footer.icon.name"
        class="inline-block mx-1 align-[-0.125em] footer-icon"
        :class="footer.icon.animated && 'animate-pulse'"
        :style="{ color: footer.icon.color }"
      />
      <span v-if="footer.copyright && author">{{ author }}</span>
    </p>
  </div>
</template>
