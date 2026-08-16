// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // Enable Nuxt 4 compatibility features
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/image'
  ],

  // Site Configuration for Nuxt SEO
  site: {
    url: 'https://www.ingeniumbright.com',
    name: 'Ingenium Bright',
    description: 'Digital Solutions & Technology - Technology that moves your business forward.',
    defaultLocale: 'es'
  },

  // Nuxt i18n Configuration
  i18n: {
    locales: [
      { code: 'es', iso: 'es', name: 'Español', file: 'es.json' },
      { code: 'en', iso: 'en-CA', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-CA', name: 'Français', file: 'fr.json' }
    ],
    defaultLocale: 'es',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    },
    customRoutes: 'config',
    pages: {
      'solutions/index': {
        en: '/solutions',
        fr: '/solutions',
        es: '/soluciones'
      },
      'solutions/web': {
        en: '/web-development',
        fr: '/developpement-web',
        es: '/desarrollo-web'
      },
      'solutions/software': {
        en: '/custom-software',
        fr: '/logiciels-sur-mesure',
        es: '/software-a-medida'
      },
      'solutions/automation': {
        en: '/automation-ai',
        fr: '/automatisation-ia',
        es: '/automatizacion-ia'
      },
      'solutions/data': {
        en: '/data-analytics',
        fr: '/donnees-analytiques',
        es: '/datos-y-analitica'
      },
      'solutions/cloud': {
        en: '/cloud-security',
        fr: '/cloud-securite',
        es: '/nube-y-seguridad'
      },
      'solutions/consulting': {
        en: '/technology-consulting',
        fr: '/conseil-technologique',
        es: '/consultoria-tecnologica'
      },
      'work/index': {
        en: '/work',
        fr: '/projets',
        es: '/portafolio'
      },
      'work/[id]': {
        en: '/work/:id',
        fr: '/projets/:id',
        es: '/portafolio/:id'
      },
      'about': {
        en: '/about',
        fr: '/a-propos',
        es: '/sobre-nosotros'
      },
      'insights': {
        en: '/insights',
        fr: '/perspectives',
        es: '/insights'
      },
      'contact': {
        en: '/contact',
        fr: '/contact',
        es: '/contacto'
      }
    }
  },

  // Tailwind CSS configuration (if needed)
  tailwindcss: {
    exposeConfig: true,
    viewer: false
  },

  // Nuxt Image Configuration
  image: {
    format: ['webp', 'avif'],
    providers: {
      local: {
        dir: 'public'
      }
    }
  }
})
