import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        updated: z.string().optional(),
        tags: z.array(z.string()).optional(),
        permalink: z.string().optional(),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['posts/**'],
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date().optional(),
        updated: z.string().optional(),
        tags: z.array(z.string()).optional(),
        permalink: z.string().optional(),
      }),
    }),
  },
})
