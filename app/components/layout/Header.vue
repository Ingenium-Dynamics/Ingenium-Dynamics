<script setup lang="ts">
import { ref } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const routes = useAppRoutes()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { key: 'solutions', to: () => routes.solutions() },
  { key: 'work', to: () => routes.work() },
  { key: 'about', to: () => routes.about() },
  { key: 'insights', to: () => routes.insights() }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-brand-dark/80 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <NuxtLink :to="routes.home()" class="flex items-center space-x-3 group" aria-label="Ingenium Bright — Home">
        <img 
          src="/img/Logo_V3/Logo_ID_1.png" 
          alt="Ingenium Bright Logo" 
          width="82"
          height="40"
          class="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </NuxtLink>

      <!-- <nav> semántico: define la navegación principal para crawlers y lectores de pantalla -->
      <nav aria-label="Main navigation" class="hidden md:flex items-center space-x-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.to()"
          class="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
          active-class="text-brand-primary font-semibold"
        >
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <div class="hidden md:flex items-center">
        <NuxtLink :to="routes.contact()" class="btn-premium-secondary px-5 py-2 text-sm">
          {{ $t('nav.cta') }}
        </NuxtLink>
        <LanguageSwitcher />
      </div>

      <button 
        @click="toggleMobileMenu"
        class="md:hidden p-2 text-zinc-400 hover:text-zinc-100 focus:outline-none"
        :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMobileMenuOpen"
      >
        <svg v-if="!isMobileMenuOpen" class="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg v-else class="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div 
      v-if="isMobileMenuOpen"
      class="md:hidden border-b border-white/5 bg-brand-dark/95 backdrop-blur-2xl transition-all duration-300"
      aria-label="Mobile navigation"
    >
      <div class="px-6 py-6 space-y-4 flex flex-col">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.to()"
          @click="isMobileMenuOpen = false"
          class="text-base font-medium text-zinc-400 hover:text-zinc-100 py-2 transition-colors duration-200"
          active-class="text-brand-primary font-semibold border-l-2 border-brand-primary pl-2"
        >
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
        <NuxtLink 
          :to="routes.contact()"
          @click="isMobileMenuOpen = false"
          class="btn-premium-primary text-center py-3 text-sm w-full mt-4"
        >
          {{ $t('nav.cta') }}
        </NuxtLink>
        
        <div class="flex items-center justify-center pt-6 border-t border-white/5 mt-4">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>
