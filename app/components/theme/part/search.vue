<script setup lang="ts">
const {
  search: {
    mode,
  },
} = usePublicConfig()
</script>

<template>
  <ThemePartLocalSearch v-if="mode === 'local'" />
</template>
