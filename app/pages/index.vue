<script setup lang="ts">
import { useLocalePath, useSeoMeta } from '#imports'
import { 
  Laptop, 
  Cpu, 
  GitFork, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Compass
} from 'lucide-vue-next'
import CardPremium from '~/components/ui/CardPremium.vue'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'

const localePath = useLocalePath()

// SEO Optimization
useSeoMeta({
  title: 'Technology that moves your business forward',
  ogTitle: 'Ingenium Bright | Digital Solutions & Technology',
  description: 'We design and build digital solutions around your business — from websites and applications to automation, data and cloud.',
  ogDescription: 'We design and build digital solutions around your business — from websites and applications to automation, data and cloud.',
  ogImage: '/img/Logo_V3/ingenium_1.png'
})

const solutionsList = [
  { key: 'web', icon: Laptop, path: '/solutions/web', color: 'emerald' },
  { key: 'software', icon: Cpu, path: '/solutions/software', color: 'blue' },
  { key: 'automation', icon: GitFork, path: '/solutions/automation', color: 'violet' },
  { key: 'data', icon: BarChart3, path: '/solutions/data', color: 'emerald' },
  { key: 'cloud', icon: ShieldCheck, path: '/solutions/cloud', color: 'blue' },
  { key: 'consulting', icon: Users, path: '/solutions/consulting', color: 'violet' }
]

const processSteps = [
  { step: '01', key: 'step1', icon: Compass },
  { step: '02', key: 'step2', icon: Layers },
  { step: '03', key: 'step3', icon: Zap },
  { step: '04', key: 'step4', icon: Sparkles }
]

const whyUsItems = [
  { key: 'business_first', icon: Users },
  { key: 'expertise', icon: Cpu },
  { key: 'scalable', icon: Layers },
  { key: 'partner', icon: Sparkles }
]
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Ambient Neon Lights -->
    <div class="absolute top-20 left-10 neon-glow-emerald opacity-20"></div>
    <div class="absolute top-1/3 right-10 neon-glow-violet opacity-15"></div>
    <div class="absolute bottom-20 left-1/4 neon-glow-blue opacity-15"></div>

    <!-- 1. Hero Section -->
    <section class="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col items-center text-center">
      <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-xs font-display text-zinc-400 mb-6 animate-fade-in">
        <Sparkles class="w-4 h-4 text-brand-primary" />
        <span>Ingenium Bright &bull; Digital Solutions</span>
      </div>

      <h1 class="text-4xl md:text-7xl font-extrabold font-display leading-[1.1] text-gradient tracking-tight max-w-4xl animate-fade-in-up">
        Technology that moves your <br class="hidden md:inline" />
        <span class="text-gradient-emerald">business forward.</span>
      </h1>

      <p class="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-sans animate-fade-in-up">
        {{ $t('hero.subtitle') }}
      </p>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-fade-in-up">
        <ButtonPremium :to="localePath('/contact')" variant="primary" class="w-full sm:w-auto">
          {{ $t('hero.cta_primary') }}
        </ButtonPremium>
        <ButtonPremium :to="localePath('/work')" variant="secondary" class="w-full sm:w-auto">
          {{ $t('hero.cta_secondary') }}
        </ButtonPremium>
      </div>

      <!-- Quick Badges Grid -->
      <div class="mt-20 grid grid-cols-2 md:grid-cols-6 gap-4 w-full border-t border-white/5 pt-12 animate-fade-in">
        <div 
          v-for="sol in solutionsList" 
          :key="sol.key"
          class="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-zinc-950/20 backdrop-blur-sm"
        >
          <component :is="sol.icon" class="w-5 h-5 text-zinc-500 mb-2" />
          <span class="text-xs font-display font-medium text-zinc-400">{{ $t(`hero.badge_${sol.key}`) }}</span>
        </div>
      </div>
    </section>

    <!-- 2. Problem / Value Section -->
    <section class="border-t border-white/5 bg-zinc-950/40 py-24 relative">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 space-y-6">
          <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
            {{ $t('problem_value.tagline') }}
          </span>
          <h2 class="text-3xl md:text-5xl font-display font-bold leading-tight">
            {{ $t('problem_value.title') }}
          </h2>
        </div>
        <div class="lg:col-span-7 lg:pl-12">
          <p class="text-lg text-zinc-400 leading-relaxed font-sans">
            {{ $t('problem_value.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- 3. Solutions Section -->
    <section class="max-w-7xl mx-auto px-6 py-24">
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
          {{ $t('solutions.tagline') }}
        </span>
        <h2 class="text-3xl md:text-5xl font-display font-bold">
          {{ $t('solutions.title') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardPremium 
          v-for="sol in solutionsList" 
          :key="sol.key"
          :glow-color="sol.color"
          class="flex flex-col h-full justify-between"
        >
          <div class="space-y-4">
            <div class="p-3 bg-white/5 rounded-xl inline-block">
              <component :is="sol.icon" class="w-6 h-6 text-zinc-100" />
            </div>
            <h3 class="text-xl font-display font-semibold text-zinc-100">
              {{ $t(`solutions.${sol.key}.title`) }}
            </h3>
            <p class="text-sm text-zinc-400 leading-relaxed">
              {{ $t(`solutions.${sol.key}.desc`) }}
            </p>
          </div>

          <div class="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <ul class="flex flex-wrap gap-1.5 max-w-[80%]">
              <li 
                v-for="item in ($t(`solutions.${sol.key}.items`) as any)" 
                :key="item"
                class="text-[10px] font-sans px-2 py-0.5 bg-white/5 rounded text-zinc-400"
              >
                {{ item }}
              </li>
            </ul>
            <NuxtLink :to="localePath(sol.path)" class="text-zinc-100 hover:text-brand-primary transition-colors">
              <ArrowRight class="w-5 h-5" />
            </NuxtLink>
          </div>
        </CardPremium>
      </div>
    </section>

    <!-- 4. How We Work (Process) -->
    <section class="border-t border-white/5 bg-zinc-950/20 py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
            {{ $t('process.tagline') }}
          </span>
          <h2 class="text-3xl md:text-5xl font-display font-bold">
            {{ $t('process.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div 
            v-for="step in processSteps" 
            :key="step.step"
            class="relative space-y-4 p-6 rounded-2xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm"
          >
            <div class="flex items-center justify-between">
              <span class="text-4xl font-display font-extrabold text-white/10">{{ step.step }}</span>
              <component :is="step.icon" class="w-5 h-5 text-brand-primary" />
            </div>
            <h3 class="text-lg font-display font-semibold text-zinc-200">
              {{ $t(`process.${step.key}_title`) }}
            </h3>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`process.${step.key}_desc`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Why Ingenium Bright -->
    <section class="max-w-7xl mx-auto px-6 py-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 space-y-6">
          <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
            {{ $t('why_us.tagline') }}
          </span>
          <h2 class="text-3xl md:text-5xl font-display font-bold leading-tight">
            {{ $t('why_us.title') }}
          </h2>
          <div class="pt-4">
            <ButtonPremium :to="localePath('/about')" variant="secondary">
              Learn about our capabilities
            </ButtonPremium>
          </div>
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div 
            v-for="item in whyUsItems" 
            :key="item.key"
            class="p-6 rounded-xl border border-white/5 bg-zinc-950/40 space-y-3"
          >
            <component :is="item.icon" class="w-6 h-6 text-brand-primary" />
            <h3 class="text-lg font-display font-semibold text-zinc-200">
              {{ $t(`why_us.${item.key}_title`) }}
            </h3>
            <p class="text-sm text-zinc-400 leading-relaxed font-sans">
              {{ $t(`why_us.${item.key}_desc`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Bottom Banner CTA -->
    <section class="max-w-7xl mx-auto px-6 pb-24">
      <div class="relative rounded-3xl border border-white/5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-12 md:p-20 overflow-hidden text-center flex flex-col items-center">
        <!-- background glows -->
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div class="absolute -top-12 left-10 neon-glow-emerald opacity-25"></div>
        <div class="absolute -bottom-12 right-10 neon-glow-violet opacity-20"></div>

        <h2 class="text-3xl md:text-5xl font-display font-bold text-zinc-100 max-w-2xl relative z-10">
          {{ $t('contact.title') }}
        </h2>
        <p class="mt-6 text-zinc-400 max-w-lg leading-relaxed text-sm md:text-base relative z-10 font-sans">
          {{ $t('contact.desc') }}
        </p>
        <div class="mt-10 relative z-10">
          <ButtonPremium :to="localePath('/contact')" variant="primary">
            {{ $t('nav.cta') }}
          </ButtonPremium>
        </div>
      </div>
    </section>
  </div>
</template>
