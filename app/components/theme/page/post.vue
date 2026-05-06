<script setup lang="ts">
const post = await usePost()
</script>

<template>
  <article class="post-content">
    <header class="flex flex-col items-center post-header">
      <h1 class="text-3xl/normal text-center w-fit post-title">
        {{ post?.title }}
      </h1>
      <div class="text-muted text-sm post-meta-container">
        <div class="flex flex-wrap items-center gap-2 post-meta justify-center">
          <span class="flex items-center gap-1 post-meta-item">
            <UIcon name="lucide:calendar" class="post-meta-item-icon" />
            <span class="post-meta-item-text">发表于</span>
            <time
              class="border-dashed border-b"
              :title="`创建时间: ${post?.datetime}`"
            >{{ post?.date }}</time>
          </span>
        </div>
      </div>
    </header>
    <div class="post-body">
      <ContentRenderer v-if="post" :value="post" :prose="true" />
    </div>
  </article>
</template>
