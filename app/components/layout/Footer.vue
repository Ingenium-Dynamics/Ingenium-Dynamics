<script setup lang="ts">
import { useLocalePath } from '#imports'
import LanguageSwitcher from './LanguageSwitcher.vue'

const localePath = useLocalePath()
const currentYear = new Date().getFullYear()

const solutions = [
  { key: 'web', path: '/solutions/web' },
  { key: 'software', path: '/solutions/software' },
  { key: 'automation', path: '/solutions/automation' },
  { key: 'data', path: '/solutions/data' },
  { key: 'cloud', path: '/solutions/cloud' },
  { key: 'consulting', path: '/solutions/consulting' }
]

const companyLinks = [
  { key: 'about', path: '/about' },
  { key: 'work', path: '/work' },
  { key: 'insights', path: '/insights' },
  { key: 'contact', path: '/contact' }
]
</script>

<template>
  <footer class="relative z-10 border-t border-white/5 bg-brand-dark pt-20 pb-10 overflow-hidden">
    <!-- Grid elements for ambient lights in background -->
    <div class="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 neon-glow-violet opacity-20 transform translate-y-1/2"></div>
    <div class="absolute top-1/2 left-10 neon-glow-emerald opacity-10"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-20">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
        <!-- Brand Description -->
        <div class="md:col-span-1 space-y-4">
          <NuxtLink :to="localePath('/')" class="inline-block">
            <img 
              src="/img/Logo_V3/Logo_ID_1.png" 
              alt="Ingenium Bright" 
              class="h-10 w-auto object-contain"
            />
          </NuxtLink>
          <p class="text-sm text-zinc-400 leading-relaxed font-sans">
            {{ $t('footer.desc') }}
          </p>
          <div class="pt-4 text-xs text-zinc-500">
            <span>info@ingeniumbright.com</span>
          </div>
        </div>

        <!-- Solutions Links -->
        <div class="space-y-4">
          <h4 class="text-sm font-display font-semibold uppercase tracking-wider text-zinc-300">
            {{ $t('footer.solutions_title') }}
          </h4>
          <ul class="space-y-2">
            <li v-for="sol in solutions" :key="sol.key">
              <NuxtLink 
                :to="localePath(sol.path)" 
                class="text-sm text-zinc-400 hover:text-brand-primary transition-colors duration-200"
              >
                {{ $t(`solutions.${sol.key}.title`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div class="space-y-4">
          <h4 class="text-sm font-display font-semibold uppercase tracking-wider text-zinc-300">
            {{ $t('footer.company_title') }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in companyLinks" :key="link.key">
              <NuxtLink 
                :to="localePath(link.path)" 
                class="text-sm text-zinc-400 hover:text-brand-primary transition-colors duration-200"
              >
                {{ $t(`nav.${link.key}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media/Newsletter Concept -->
        <div class="space-y-4">
          <h4 class="text-sm font-display font-semibold uppercase tracking-wider text-zinc-300">
            Social
          </h4>
          <ul class="space-y-3">
            <li>
              <a 
                href="https://www.instagram.com/ingenium_bright/" 
                target="_blank" 
                rel="noopener"
                class="flex items-center space-x-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/company/ingenium-dynamics" 
                target="_blank" 
                rel="noopener"
                class="flex items-center space-x-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright Bottom Bar -->
      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p class="text-xs text-zinc-500 font-sans">
          &copy; {{ currentYear }} Ingenium Bright. {{ $t('footer.rights') }}
        </p>
        
        <!-- Language selector container for footer -->
        <div class="mt-4 md:mt-0 flex items-center">
          <span class="text-xs text-zinc-500 font-sans mr-2">Language:</span>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </footer>
</template>
