import { PORTFOLIO_PROJECT_IDS } from './app/data/projects'

const workRoutesByLocale: Record<string, (id: string) => string> = {
  en: id => `/en/work/${id}`,
  fr: id => `/fr/projets/${id}`,
  es: id => `/es/portafolio/${id}`
}

const prerenderWorkRoutes = Object.entries(workRoutesByLocale).flatMap(([locale, pathFn]) =>
  PORTFOLIO_PROJECT_IDS.map(id => pathFn(id))
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/image'
  ],

  runtimeConfig: {
    public: {
      awsRegion: 'us-east-1',
      awsIdentityPoolId: 'us-east-1:4cb32f41-9337-4954-83a1-214f3ead6d6d',
      awsSnsTopicArn: 'arn:aws:sns:us-east-1:183295419448:Topic_ContactForm_ID_es_CG_03'
    }
  },

  site: {
    url: 'https://www.ingeniumbright.com',
    name: 'Ingenium Bright',
    description: 'Digital Solutions & Technology — Technology that moves your business forward.',
    defaultLocale: 'en'
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Ingenium Bright',
      url: 'https://www.ingeniumbright.com',
      logo: 'https://www.ingeniumbright.com/img/Logo_V3/Logo_ID_1.png',
      description: 'Digital solutions and technology boutique — web, software, automation, data and cloud.',
      sameAs: [
        'https://www.instagram.com/ingenium_bright/',
        'https://www.linkedin.com/company/ingenium-dynamics'
      ],
      email: 'francisco.monroy@ingeniumbright.com'
    }
  },

  sitemap: {
    zeroRuntime: true
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-CA', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-CA', name: 'Français', file: 'fr.json' },
      { code: 'es', iso: 'es', name: 'Español', file: 'es.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales/',
    baseUrl: 'https://www.ingeniumbright.com',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'en'
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
    en: '/work/[id]',
    fr: '/projets/[id]',
    es: '/portafolio/[id]'
  },
      about: {
        en: '/about',
        fr: '/a-propos',
        es: '/sobre-nosotros'
      },
      insights: {
        en: '/insights',
        fr: '/perspectives',
        es: '/insights'
      },
      contact: {
        en: '/contact',
        fr: '/contact',
        es: '/contacto'
      }
    }
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: false
  },

  image: {
    format: ['webp', 'avif']
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: prerenderWorkRoutes
    }
  }
})
