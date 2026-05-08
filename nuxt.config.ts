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

      indexGenerator: {
        perPage: 10,
      },

      search: {
        enable: false,
        mode: 'local',
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
})
