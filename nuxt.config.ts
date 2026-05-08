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
      author: '',
      language: 'zh-CN',

      indexGenerator: {
        perPage: 10,
      },

      search: {
        enable: false,
        mode: 'local',
      },

      // ---------------------------------------------------------------
      // Menu Settings
      // ---------------------------------------------------------------
      menu: [
        // { label: '首页', icon: 'lucide:home', to: '/' },
        // { label: '关于', icon: 'lucide:user', to: '/about/' },
        // { label: '标签', icon: 'lucide:tags', to: '/tags/' },
        // { label: '分类', icon: 'lucide:layout-grid', to: '/categories/' },
        // { label: '归档', icon: 'lucide:archive', to: '/archives/' },
      ],

      // ---------------------------------------------------------------
      // Sidebar Settings
      // ---------------------------------------------------------------

      sidebar: {
        widthExpanded: 320,
        widthDualColumn: 240,
      },

      // Sidebar Avatar
      avatar: {
        url: '',
        rounded: false,
      },

      // Table of Contents in the Sidebar
      toc: {
        enable: true,
      },

      // ---------------------------------------------------------------
      // Footer Settings
      // ---------------------------------------------------------------
      footer: {
        since: '',
        copyright: true,
        icon: {
          enable: true,
          name: 'lucide:heart',
          color: '#ff0000',
          animated: false,
        },
      },
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
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
