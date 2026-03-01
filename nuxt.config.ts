export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
  ],

  runtimeConfig: {
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL,
    }
  },

  i18n: {
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español' },
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'de', language: 'de-DE', name: 'Deutsch' },
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'it', language: 'it-IT', name: 'Italiano' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
  },

  site: {
    url: 'https://planesengijon.com',
  },

  sitemap: {},

  robots: {},
})