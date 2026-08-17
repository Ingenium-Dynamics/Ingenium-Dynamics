<script setup lang="ts">

import ButtonPremium from '~/components/ui/ButtonPremium.vue'

const { locale } = useI18n()

useSeoMeta({
  title: () =>
    locale.value === 'fr'
      ? 'Insights & Communauté | Ingenium Bright'
      : locale.value === 'es'
        ? 'Insights & Comunidad | Ingenium Bright'
        : 'Insights & Community | Ingenium Bright',

  description: () =>
    locale.value === 'fr'
      ? 'Suivez Ingenium Bright sur Instagram pour des mises à jour sur la stratégie numérique, des insights techniques et les points forts de nos projets.'
      : locale.value === 'es'
        ? 'Sigue a Ingenium Bright en Instagram para ver novedades de estrategia digital, insights técnicos y lo más destacado de nuestros proyectos.'
        : 'Follow Ingenium Bright on Instagram for digital strategy updates, technical insights, and project highlights.'
})
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <div class="absolute top-20 right-10 neon-glow-emerald opacity-10"></div>

    <div class="max-w-4xl mx-auto px-6 relative z-10 space-y-16">
      <div class="space-y-6">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
          {{ $t('insights.eyebrow') }}
        </span>
        <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight">
          {{ $t('insights.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans">
          {{ $t('insights.description') }}
        </p>
      </div>

      <div class="relative rounded-3xl border border-white/5 bg-zinc-950/20 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div class="space-y-4 relative z-10 text-center md:text-left">
          <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs text-brand-primary">
            <span class="font-bold">@</span>
            <span>{{ $t('insights.instagramHandle') }}</span>
          </div>
          <h2 class="text-2xl font-display font-bold text-zinc-100">
            {{ $t('insights.banner_title') }}
          </h2>
          <p class="text-sm text-zinc-500 max-w-sm leading-relaxed font-sans">
            {{ $t('insights.banner_desc') }}
          </p>
        </div>

        <div class="relative z-10 flex-shrink-0 w-full md:w-auto">
          <ButtonPremium href="https://www.instagram.com/ingenium_bright/" variant="primary" class="w-full md:w-auto">
            <span>{{ $t('insights.instagram') }}</span>
          </ButtonPremium>
        </div>
      </div>

      <div class="border-t border-white/5 pt-12">
        <p class="text-sm text-zinc-500 leading-relaxed font-sans">
          {{ $t('insights.coming_soon') }}
        </p>
      </div>
    </div>
  </div>
</template>
