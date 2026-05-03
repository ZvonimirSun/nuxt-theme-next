// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/scripts',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2026-05-03',

  eslint: {
    config: {
      standalone: false,
    },
  },
})
