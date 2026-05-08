import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxt/eslint'],

  runtimeConfig: {
    public: {},
  },

  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),

      standalone: false,
    },
  },
  experimental: {
    payloadExtraction: 'client',
  },
})
