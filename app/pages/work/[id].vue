<script setup lang="ts">
import { ArrowLeft, ExternalLink, Globe, Sparkles } from '@lucide/vue'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import CardPremium from '~/components/ui/CardPremium.vue'
import { getProjectById } from '~/data/projects'

const route = useRoute()
const routes = useAppRoutes()
const projectId = route.params.id as string

const currentProject = getProjectById(projectId)

if (!currentProject) {
  throw createError({ statusCode: 404, statusMessage: 'Case Study Not Found' })
}

const { t, locale } = useI18n()

useSeoMeta({
  title: () => {
    const suffix = locale.value === 'fr' ? 'Étude de Cas' : locale.value === 'es' ? 'Caso de Estudio' : 'Case Study'
    return `${t(`portfolio.projects.${projectId}.title`)} — ${suffix}`
  },
  description: () => t(`portfolio.projects.${projectId}.description`)
})
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <div 
      class="absolute top-20 left-10 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none"
      :class="currentProject.color === 'emerald' ? 'bg-brand-primary' : currentProject.color === 'blue' ? 'bg-brand-blue' : 'bg-brand-accent'"
    ></div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <NuxtLink :to="routes.work()" class="inline-flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-12 text-sm font-display">
        <ArrowLeft class="w-4 h-4" />
        <span>{{ $t('portfolio.back_to_work') }}</span>
      </NuxtLink>

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

        <div class="pt-4">
          <ButtonPremium :href="currentProject.web" variant="secondary" class="inline-flex items-center space-x-2">
            <Globe class="w-4 h-4 text-brand-primary" />
            <span>{{ $t('portfolio.visit_site') }}</span>
            <ExternalLink class="w-3.5 h-3.5 text-zinc-500" />
          </ButtonPremium>
        </div>
      </div>

      <div class="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/5 pt-16">
        <div class="lg:col-span-2 space-y-12">
          <div class="space-y-4">
            <h2 class="text-2xl font-display font-bold text-zinc-100">
              {{ $t('portfolio.challenge') }}
            </h2>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`portfolio.projects.${projectId}.challenge`) }}
            </p>
          </div>

          <div v-if="$te(`portfolio.projects.${projectId}.approach`)" class="space-y-4">
            <h2 class="text-2xl font-display font-bold text-zinc-100">
              {{ $t('portfolio.approach') }}
            </h2>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`portfolio.projects.${projectId}.approach`) }}
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-display font-bold text-zinc-100">
              {{ $t('portfolio.solution') }}
            </h2>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`portfolio.projects.${projectId}.solution`) }}
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-display font-bold text-zinc-100">
              {{ $t('portfolio.result') }}
            </h2>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`portfolio.projects.${projectId}.result`) }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-1 space-y-8">
          <CardPremium glow-color="none" :hoverable="false" class="bg-zinc-950/20">
            <h3 class="text-xs font-display font-semibold uppercase tracking-wider text-zinc-500 mb-6">
              {{ $t('portfolio.details') }}
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

      <div class="mt-24 space-y-8 border-t border-white/5 pt-16">
        <h2 class="text-2xl font-display font-bold text-zinc-100">
          {{ $t('portfolio.gallery') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(img, idx) in currentProject.images" 
            :key="img"
            class="relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group aspect-video"
          >
            <img 
              :src="img" 
              :alt="`${$t(`portfolio.projects.${projectId}.title`)} — ${idx + 1}`"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div class="mt-24 rounded-3xl border border-white/5 bg-zinc-950/40 p-10 md:p-16 text-center space-y-6">
        <Sparkles class="w-8 h-8 text-brand-primary mx-auto" />
        <h3 class="text-2xl md:text-3xl font-display font-bold text-zinc-100">
          {{ $t('portfolio.cta_title') }}
        </h3>
        <p class="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          {{ $t('portfolio.cta_desc') }}
        </p>
        <div class="pt-4">
          <ButtonPremium :to="routes.contact()" variant="primary">
            {{ $t('portfolio.cta_button') }}
          </ButtonPremium>
        </div>
      </div>
    </div>
  </div>
</template>