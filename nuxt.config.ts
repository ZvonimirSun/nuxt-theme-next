// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {},
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
