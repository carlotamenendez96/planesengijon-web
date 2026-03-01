export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  components: [
    { path: '~/components', pathPrefix: false },
  ],

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
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: '.',
    customRoutes: 'config',
    pages: {
      'gastronomia/index': {
        es: '/gastronomia',
        en: '/gastronomy',
        de: '/gastronomie',
        fr: '/gastronomie',
        it: '/gastronomia',
      },
      'playas/index': {
        es: '/playas',
        en: '/beaches',
        de: '/straende',
        fr: '/plages',
        it: '/spiagge',
      },
      'playas/[slug]': {
        es: '/playas/:slug',
        en: '/beaches/:slug',
        de: '/straende/:slug',
        fr: '/plages/:slug',
        it: '/spiagge/:slug',
      },
      'restaurantes/index': {
        es: '/restaurantes',
        en: '/restaurants',
        de: '/restaurants',
        fr: '/restaurants',
        it: '/ristoranti',
      },
      'restaurantes/[slug]': {
        es: '/restaurantes/:slug',
        en: '/restaurants/:slug',
        de: '/restaurants/:slug',
        fr: '/restaurants/:slug',
        it: '/ristoranti/:slug',
      },
      'lugares/index': {
        es: '/lugares',
        en: '/places',
        de: '/orte',
        fr: '/lieux',
        it: '/luoghi',
      },
      'lugares/[slug]': {
        es: '/lugares/:slug',
        en: '/places/:slug',
        de: '/orte/:slug',
        fr: '/lieux/:slug',
        it: '/luoghi/:slug',
      },
      'itinerarios/index': {
        es: '/itinerarios',
        en: '/itineraries',
        de: '/reiserouten',
        fr: '/itineraires',
        it: '/itinerari',
      },
      'itinerarios/[slug]': {
        es: '/itinerarios/:slug',
        en: '/itineraries/:slug',
        de: '/reiserouten/:slug',
        fr: '/itineraires/:slug',
        it: '/itinerari/:slug',
      },
    },
  },

  site: {
    url: 'https://planesengijon.com',
  },

  sitemap: {},

  robots: {},
})