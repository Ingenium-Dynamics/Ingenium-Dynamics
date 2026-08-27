<script setup lang="ts">
import { useLocalePath, useSeoMeta } from '#imports'
import { 
  Laptop, 
  Cpu, 
  GitFork, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  ArrowRight 
} from 'lucide-vue-next'
import CardPremium from '~/components/ui/CardPremium.vue'

const localePath = useLocalePath()

useSeoMeta({
  title: 'Solutions & Technology Services',
  description: 'Explore our technology solutions: Web development, custom applications, automation, data engineering, cloud architecture, and strategic SAP consulting.'
})

const solutions = [
  { key: 'web', icon: Laptop, route: 'solutions-web', color: 'emerald' },
  { key: 'software', icon: Cpu, route: 'solutions-software', color: 'blue' },
  { key: 'automation', icon: GitFork, route: 'solutions-automation', color: 'violet' },
  { key: 'data', icon: BarChart3, route: 'solutions-data', color: 'emerald' },
  { key: 'cloud', icon: ShieldCheck, route: 'solutions-cloud', color: 'blue' },
  { key: 'consulting', icon: Users, route: 'solutions-consulting', color: 'violet' }
]
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <!-- background ambient glows -->
    <div class="absolute top-20 right-10 neon-glow-violet opacity-10"></div>
    <div class="absolute bottom-20 left-10 neon-glow-emerald opacity-10"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Title & Header -->
      <div class="max-w-3xl mb-20 space-y-4">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
          {{ $t('solutions.tagline') }}
        </span>
        <h1 class="text-4xl md:text-6xl font-display font-bold text-gradient tracking-tight">
          {{ $t('solutions.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans max-w-2xl">
          We combine software engineering, UX/UI design, automation, data, and cloud architecture to solve real business challenges.
        </p>
      </div>

      <!-- Solutions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardPremium 
          v-for="sol in solutions" 
          :key="sol.key"
          :glow-color="sol.color"
          class="flex flex-col h-full justify-between"
        >
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div class="p-3 bg-white/5 rounded-xl">
                <component :is="sol.icon" class="w-6 h-6 text-zinc-100" />
              </div>
              <span class="text-[10px] font-display font-semibold uppercase tracking-widest text-zinc-500">
                0{{ solutions.indexOf(sol) + 1 }}
              </span>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-display font-bold text-zinc-100">
                {{ $t(`solutions.${sol.key}.title`) }}
              </h3>
              <p class="text-sm text-zinc-400 leading-relaxed font-sans">
                {{ $t(`solutions.${sol.key}.desc`) }}
              </p>
            </div>

            <!-- List of Sub-Services -->
            <ul class="space-y-2 pt-2">
              <li 
                v-for="item in ($t(`solutions.${sol.key}.items`) as any)" 
                :key="item"
                class="flex items-center space-x-2 text-xs text-zinc-400 font-sans"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <span class="text-xs text-zinc-500 font-sans">Learn more about {{ $t(`solutions.${sol.key}.title`) }}</span>
            <NuxtLink 
              :to="localePath({ name: sol.route })" 
              :aria-label="`Learn more about ${$t(`solutions.${sol.key}.title`)}`"
              class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-zinc-200 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-300"
            >
              <ArrowRight class="w-5 h-5" aria-hidden="true" />
            </NuxtLink>
          </div>
        </CardPremium>
      </div>
    </div>
  </div>
</template>
