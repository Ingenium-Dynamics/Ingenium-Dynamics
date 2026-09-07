<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

const route = useRoute()
const { locale } = useI18n()

const siteUrl = 'https://www.ingeniumbright.com'
const ogImage = `${siteUrl}/img/Logo_V3/OG-IngeniumBright.png`

/*
 * Map Nuxt i18n locale → Open Graph locale.
 * Open Graph uses language_REGION notation.
 */
const ogLocale = computed(() => {
  const locales: Record<string, string> = {
    en: 'en_CA',
    fr: 'fr_CA',
    es: 'es_CL'
  }

  return locales[locale.value] || 'en_CA'
})

/*
 * Absolute URL of the current page.
 * Important for social networks and SEO.
 */
const canonicalUrl = computed(() => {
  const path = route.fullPath || '/'
  return `${siteUrl}${path}`
})

// Global SEO / HEAD configuration
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Ingenium Bright`
      : 'Ingenium Bright | Digital Solutions & Technology'
  },

  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      charset: 'utf-8'
    },

    // Open Graph image
    /*{
      key: 'og-image',
      property: 'og:image',
      content: ogImage
    },
    {
      key: 'og-image-width',
      property: 'og:image:width',
      content: '1200'
    },
    {
      key: 'og-image-height',
      property: 'og:image:height',
      content: '630'
    },
    {
      key: 'og-image-type',
      property: 'og:image:type',
      content: 'image/png'
    },

    // Open Graph locale
    {
      key: 'og-locale',
      property: 'og:locale',
      content: ogLocale
    },

    // Open Graph URL
    {
      key: 'og-url',
      property: 'og:url',
      content: canonicalUrl
    },*/

    // Twitter / X
    {
      key: 'twitter-card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      key: 'twitter-image',
      name: 'twitter:image',
      content: ogImage
    }
  ],

  link: [
    // Standard favicon
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/img/favicon_io/favicon.ico'
    },

    // PNG favicons
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/img/favicon_io/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/img/favicon_io/favicon-16x16.png'
    },

    // Apple devices
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/img/favicon_io/apple-touch-icon.png'
    },

    // Web App Manifest
    {
      rel: 'manifest',
      href: '/img/favicon_io/site.webmanifest'
    }
  ]
})
useSeoMeta({
  ogImage: ogImage,
  twitterImage: ogImage,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-grow pt-20">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<style>
/* Page transition styles */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>