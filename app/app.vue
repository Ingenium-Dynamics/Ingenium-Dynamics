<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

// Set default Head tags for SEO
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Ingenium Bright` : 'Ingenium Bright | Digital Solutions & Technology'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { charset: 'utf-8' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/img/favicon_io/favicon-32x32.png' }
  ]
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
