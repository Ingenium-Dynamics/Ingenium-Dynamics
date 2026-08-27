<script setup lang="ts">
import { useLocalePath, useSeoMeta } from '#imports'
import { Cpu, Layers, ShieldCheck, Sparkles, Users, BarChart3, Database } from '@lucide/vue'
import CardPremium from '~/components/ui/CardPremium.vue'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'

const localePath = useLocalePath()
const { locale } = useI18n()

useSeoMeta({
  title: () =>
    locale.value === 'fr'
      ? 'À propos | La technologie au service de la stratégie'
      : locale.value === 'es'
        ? 'Sobre Nosotros | Tecnología al servicio de la estrategia'
        : 'About Us | Technology Meets Business',

  description: () =>
    locale.value === 'fr'
      ? 'Ingenium Bright est une boutique de solutions numériques et technologiques. Nous relions l\'ingénierie logicielle à la stratégie d\'entreprise.'
      : locale.value === 'es'
        ? 'Ingenium Bright es una boutique de soluciones digitales y tecnología. Somos el puente entre la ingeniería de software y la estrategia de negocio.'
        : 'Ingenium Bright is a digital solutions and technology boutique. We bridge the gap between software engineering and business strategy.'
})

const capabilities = [
  { key: 'web_dev', icon: Cpu },
  { key: 'cloud', icon: ShieldCheck },
  { key: 'data', icon: Database },
  { key: 'automation', icon: Layers },
  { key: 'sap', icon: Users },
  { key: 'analytics', icon: BarChart3 }
] as const
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <!-- background glow -->
    <div class="absolute top-20 right-10 neon-glow-violet opacity-10"></div>
    <div class="absolute bottom-20 left-10 neon-glow-emerald opacity-10"></div>

    <div class="max-w-4xl mx-auto px-6 relative z-10 space-y-20">
      <!-- Header Section -->
      <div class="space-y-6">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
          {{ $t('about.tagline') }}
        </span>
        <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight leading-tight">
          {{ $t('about.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans">
          {{ $t('about.desc_1') }}
        </p>
      </div>

      <!-- Core philosophy -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-16">
        <div class="space-y-4">
          <h2 class="text-2xl font-display font-bold text-zinc-100">
            {{ $t('about.philosophy_title') }}
          </h2>
          <p class="text-sm text-zinc-400 leading-relaxed font-sans">
            {{ $t('about.desc_2') }}
          </p>
        </div>
        <div class="space-y-4">
          <h2 class="text-2xl font-display font-bold text-zinc-100">
            {{ $t('about.small_business_title') }}
          </h2>
          <p class="text-sm text-zinc-400 leading-relaxed font-sans">
            {{ $t('about.founder_note') }}
          </p>
        </div>
      </div>

      <!-- Capabilities Grid -->
      <div class="border-t border-white/5 pt-16 space-y-8">
        <h2 class="text-2xl font-display font-bold text-zinc-100">
          {{ $t('about.capabilities_title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardPremium 
            v-for="cap in capabilities" 
            :key="cap.key"
            glow-color="none"
            :hoverable="true"
            class="flex items-start space-x-4 bg-zinc-950/20"
          >
            <div class="p-2 bg-white/5 rounded-lg flex-shrink-0 text-brand-primary">
              <component :is="cap.icon" class="w-5 h-5" />
            </div>
            <div class="space-y-1">
              <h3 class="text-base font-display font-bold text-zinc-200">
                {{ $t(`about.capabilities.${cap.key}.title`) }}
              </h3>
              <p class="text-xs text-zinc-500 font-sans">
                {{ $t(`about.capabilities.${cap.key}.description`) }}
              </p>
            </div>
          </CardPremium>
        </div>
      </div>

      <!-- CTA -->
      <div class="rounded-3xl border border-white/5 bg-zinc-950/40 p-10 md:p-16 text-center space-y-6">
        <Sparkles class="w-8 h-8 text-brand-primary mx-auto" />
        <h3 class="text-2xl font-display font-bold text-zinc-100">
          {{ $t('about.cta_title') }}
        </h3>
        <p class="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          {{ $t('about.cta_desc') }}
        </p>
        <div class="pt-4">
          <ButtonPremium :to="localePath({ name: 'contact' })" variant="primary">
            {{ $t('about.cta_button') }}
          </ButtonPremium>
        </div>
      </div>
    </div>
  </div>
</template>