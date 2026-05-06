import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: {
    name: 'nuxt-theme-next',
  },
  runtimeConfig: {
    public: {
      title: '',
      subtitle: '',
      description: '',
      language: 'zh-CN',
      index: {
        perPage: 10,
      },
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/scripts',
  ],

  devtools: {
    enabled: true,
  },

  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false,
    },
  },

  css: [
    join(currentDir, './app/assets/css/main.css'),
  ],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2026-05-03',

  content: {
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
        },
      },
      transformers: [
        join(currentDir, './transformers/path-handler'),
      ],
    },
  },

  experimental: {
    payloadExtraction: true,
  },

  vite: {
    optimizeDeps: {
      include: [
        'dayjs', // CJS
      ],
    },
  },
})
