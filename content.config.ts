import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        updated: z.string().optional(),
        tags: z.array(z.string()).optional(),
        permalink: z.string().optional(),
      }),
    }),
  },
})
