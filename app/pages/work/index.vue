<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import CardPremium from '~/components/ui/CardPremium.vue'
import { PORTFOLIO_PROJECTS } from '~/data/projects'

const routes = useAppRoutes()
const { locale } = useI18n()

useSeoMeta({
  title: () =>
    locale.value === 'fr'
      ? 'Portfolio & Études de Cas | Ingenium Bright'
      : locale.value === 'es'
        ? 'Portafolio & Casos de Estudio | Ingenium Bright'
        : 'Portfolio & Case Studies | Ingenium Bright',

  description: () =>
    locale.value === 'fr'
      ? 'Découvrez nos solutions technologiques et nos études de cas réelles en design web, développement logiciel, cloud et automatisation.'
      : locale.value === 'es'
        ? 'Explora nuestras soluciones tecnológicas y casos de estudio reales en diseño web, desarrollo de software, cloud y automatización de negocios.'
        : 'Explore our technology solutions and real case studies in web design, software development, cloud, and business automation.'
})
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <div class="absolute top-20 right-10 neon-glow-emerald opacity-10"></div>
    <div class="absolute bottom-20 left-10 neon-glow-violet opacity-10"></div>

    <div class="max-w-7xl mx-auto px-6">
      <div class="max-w-3xl mb-20 space-y-4">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
          {{ $t('portfolio.tagline') }}
        </span>
        <h1 class="text-4xl md:text-6xl font-display font-bold text-gradient tracking-tight">
          {{ $t('portfolio.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans max-w-2xl">
          {{ $t('portfolio.intro') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardPremium
          v-for="project in PORTFOLIO_PROJECTS"
          :key="project.id"
          :glow-color="project.color"
          class="flex flex-col h-full justify-between !p-0 group border border-white/5 bg-zinc-950/20"
        >
          <!-- <figure> semántico: asocia la portada del proyecto con su pie de
               figura para que la IA entienda el contexto visual (alt + caption). -->
          <figure class="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b border-white/5 bg-zinc-900">
            <NuxtImg 
              :src="project.cover" 
              :alt="$t(`portfolio.projects.${project.id}.title`)"
              format="webp"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <figcaption class="sr-only">
              {{ $t(`portfolio.projects.${project.id}.title`) }}
            </figcaption>
          </figure>

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
                :to="routes.workProject(project.id)" 
                :aria-label="$t('portfolio.cta_view')"
                class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-zinc-200 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-300"
              >
                <ArrowRight class="w-5 h-5" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>
        </CardPremium>
      </div>
    </div>
  </div>
</template>