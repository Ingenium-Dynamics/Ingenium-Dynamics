<script setup lang="ts">
import { useLocalePath, useSeoMeta } from '#imports'
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import CardPremium from '~/components/ui/CardPremium.vue'

const localePath = useLocalePath()

useSeoMeta({
  title: 'Portfolio & Case Studies',
  description: 'Explore our technology solutions and real case studies in web design, software development, cloud, and business automation.'
})

const projectsList = [
  { id: 'haras-los-pellines', cover: '/img/portfolio/haras_los_pellines.webp', color: 'emerald' },
  { id: 'languagelife', cover: '/img/portfolio/languagelife1.webp', color: 'blue' },
  { id: 'alex-oyarzun', cover: '/img/portfolio/alexoyarzun1.webp', color: 'violet' },
  { id: 'nico-castro', cover: '/img/portfolio/nicocastro1.webp', color: 'emerald' },
  { id: 'fidias-place', cover: '/img/portfolio/fidias1.webp', color: 'blue' },
  { id: 'j-avila', cover: '/img/portfolio/j-avila-01.webp', color: 'violet' }
]
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <!-- background glowing blurs -->
    <div class="absolute top-20 right-10 neon-glow-emerald opacity-10"></div>
    <div class="absolute bottom-20 left-10 neon-glow-violet opacity-10"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Title & Header -->
      <div class="max-w-3xl mb-20 space-y-4">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
          {{ $t('portfolio.tagline') }}
        </span>
        <h1 class="text-4xl md:text-6xl font-display font-bold text-gradient tracking-tight">
          {{ $t('portfolio.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans max-w-2xl">
          Real challenges, real solutions. We design, build, and deploy software that addresses business needs. No fake metrics, just clean engineering.
        </p>
      </div>

      <!-- Work Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardPremium
          v-for="project in projectsList"
          :key="project.id"
          :glow-color="project.color"
          class="flex flex-col h-full justify-between !p-0 group border border-white/5 bg-zinc-950/20"
        >
          <!-- Project Cover Image -->
          <div class="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b border-white/5 bg-zinc-900">
            <img 
              :src="project.cover" 
              :alt="$t(`portfolio.projects.${project.id}.title`)"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div class="p-8 flex flex-col justify-between flex-grow">
            <div class="space-y-3">
              <span class="text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-500">
                {{ $t(`portfolio.projects.${project.id}.category`) }}
              </span>
              <h3 class="text-xl font-display font-bold text-zinc-100">
                {{ $t(`portfolio.projects.${project.id}.title`) }}
              </h3>
              <p class="text-sm text-zinc-400 leading-relaxed font-sans line-clamp-2">
                {{ $t(`portfolio.projects.${project.id}.description`) }}
              </p>
            </div>

            <div class="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span class="text-xs text-zinc-500 font-sans">
                {{ $t('portfolio.cta_view') }}
              </span>
              <NuxtLink 
                :to="localePath(`/work/${project.id}`)" 
                class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-zinc-200 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-300"
              >
                <ArrowRight class="w-5 h-5" />
              </NuxtLink>
            </div>
          </div>
        </CardPremium>
      </div>
    </div>
  </div>
</template>
