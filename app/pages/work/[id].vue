<script setup lang="ts">
import { useRoute, useLocalePath, useSeoMeta } from '#imports'
import { ArrowLeft, ExternalLink, Globe, Sparkles } from 'lucide-vue-next'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import CardPremium from '~/components/ui/CardPremium.vue'

const route = useRoute()
const localePath = useLocalePath()
const projectId = route.params.id as string

const projectsData: Record<string, { images: string[]; web: string; color: string }> = {
  'haras-los-pellines': {
    images: [
      '/img/portfolio/haras_los_pellines.webp',
      '/img/portfolio/haras_los_pellines01.webp',
      '/img/portfolio/haras_los_pellines02.webp'
    ],
    web: 'https://haraslospellines.com',
    color: 'emerald'
  },
  'languagelife': {
    images: [
      '/img/portfolio/languagelife1.webp',
      '/img/portfolio/languagelife2.webp',
      '/img/portfolio/languagelife3.webp',
      '/img/portfolio/languagelife4.webp'
    ],
    web: 'https://www.languageartlife.com/index.html',
    color: 'blue'
  },
  'alex-oyarzun': {
    images: [
      '/img/portfolio/alexoyarzun1.webp',
      '/img/portfolio/alexoyarzun2.webp',
      '/img/portfolio/alexoyarzun3.webp'
    ],
    web: 'https://www.psicologoalexoyarzun.com/',
    color: 'violet'
  },
  'nico-castro': {
    images: [
      '/img/portfolio/nicocastro1.webp',
      '/img/portfolio/nicocastro2.webp',
      '/img/portfolio/nicocastro3.webp'
    ],
    web: 'https://dyw57mjcdz9b2.cloudfront.net/',
    color: 'emerald'
  },
  'fidias-place': {
    images: [
      '/img/portfolio/fidias1.webp',
      '/img/portfolio/fidias2.webp',
      '/img/portfolio/fidias3.webp',
      '/img/portfolio/fidias4.webp'
    ],
    web: 'https://ingenium-dynamics.github.io/fidias/index2.html',
    color: 'blue'
  },
  'j-avila': {
    images: [
      '/img/portfolio/j-avila-01.webp',
      '/img/portfolio/j-avila-02.webp',
      '/img/portfolio/j-avila-03.webp'
    ],
    web: 'https://www.j-avila.com',
    color: 'violet'
  }
}

const currentProject = projectsData[projectId]

// Fallback if project is not found
if (!currentProject) {
  throw createError({ statusCode: 404, statusMessage: 'Case Study Not Found' })
}

useSeoMeta({
  title: `Case Study: ${projectId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
  description: 'Explore this custom-tailored digital solution and see the challenges, results, and technology stack used by Ingenium Bright.'
})
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <!-- background glow -->
    <div 
      class="absolute top-20 left-10 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none"
      :class="currentProject.color === 'emerald' ? 'bg-brand-primary' : currentProject.color === 'blue' ? 'bg-brand-blue' : 'bg-brand-accent'"
    ></div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Back to Work Link -->
      <NuxtLink :to="localePath('/work')" class="inline-flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-12 text-sm font-display">
        <ArrowLeft class="w-4 h-4" />
        <span>Back to Work</span>
      </NuxtLink>

      <!-- Case Study Header -->
      <div class="space-y-6">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-zinc-500">
          {{ $t(`portfolio.projects.${projectId}.category`) }}
        </span>
        <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight">
          {{ $t(`portfolio.projects.${projectId}.title`) }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans max-w-3xl">
          {{ $t(`portfolio.projects.${projectId}.description`) }}
        </p>

        <!-- Live Link Button -->
        <div class="pt-4">
          <ButtonPremium :href="currentProject.web" variant="secondary" class="inline-flex items-center space-x-2">
            <Globe class="w-4 h-4 text-brand-primary" />
            <span>{{ $t('portfolio.visit_site') }}</span>
            <ExternalLink class="w-3.5 h-3.5 text-zinc-500" />
          </ButtonPremium>
        </div>
      </div>

      <!-- Case study details grid -->
      <div class="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/5 pt-16">
        <!-- Main details -->
        <div class="lg:col-span-2 space-y-12">
          <!-- Challenge -->
          <div class="space-y-4">
            <h2 class="text-2xl font-display font-bold text-zinc-100">
              {{ $t('portfolio.challenge') }}
            </h2>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`portfolio.projects.${projectId}.challenge`) }}
            </p>
          </div>

          <!-- Solution -->
          <div class="space-y-4">
            <h2 class="text-2xl font-display font-bold text-zinc-100">
              {{ $t('portfolio.solution') }}
            </h2>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`portfolio.projects.${projectId}.solution`) }}
            </p>
          </div>

          <!-- Result -->
          <div class="space-y-4">
            <h2 class="text-2xl font-display font-bold text-zinc-100">
              {{ $t('portfolio.result') }}
            </h2>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`portfolio.projects.${projectId}.result`) }}
            </p>
          </div>
        </div>

        <!-- Sidebar stats -->
        <div class="lg:col-span-1 space-y-8">
          <CardPremium glow-color="none" :hoverable="false" class="bg-zinc-950/20">
            <h3 class="text-xs font-display font-semibold uppercase tracking-wider text-zinc-500 mb-6">
              Details
            </h3>
            
            <div class="space-y-6">
              <div>
                <span class="block text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                  {{ $t('portfolio.project') }}
                </span>
                <span class="text-sm font-sans text-zinc-300 font-medium">
                  {{ $t(`portfolio.projects.${projectId}.title`) }}
                </span>
              </div>

              <div>
                <span class="block text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                  {{ $t('portfolio.client') }}
                </span>
                <span class="text-sm font-sans text-zinc-300 font-medium">
                  {{ $t(`portfolio.projects.${projectId}.category`) }}
                </span>
              </div>

              <div>
                <span class="block text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                  {{ $t('portfolio.tech') }}
                </span>
                <p class="text-xs font-sans text-zinc-400 leading-relaxed">
                  {{ $t(`portfolio.projects.${projectId}.tech`) }}
                </p>
              </div>
            </div>
          </CardPremium>
        </div>
      </div>

      <!-- Screenshot Gallery -->
      <div class="mt-24 space-y-8 border-t border-white/5 pt-16">
        <h2 class="text-2xl font-display font-bold text-zinc-100">
          Gallery
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(img, idx) in currentProject.images" 
            :key="img"
            class="relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group aspect-video"
          >
            <img 
              :src="img" 
              :alt="`Screenshot ${idx + 1}`"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-24 rounded-3xl border border-white/5 bg-zinc-950/40 p-10 md:p-16 text-center space-y-6">
        <Sparkles class="w-8 h-8 text-brand-primary mx-auto" />
        <h3 class="text-2xl md:text-3xl font-display font-bold text-zinc-100">
          Want similar results for your business?
        </h3>
        <p class="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          Let's discuss how we can build a modern, high-performance solution that solves your operational needs.
        </p>
        <div class="pt-4">
          <ButtonPremium :to="localePath('/contact')" variant="primary">
            Start a project together
          </ButtonPremium>
        </div>
      </div>
    </div>
  </div>
</template>
