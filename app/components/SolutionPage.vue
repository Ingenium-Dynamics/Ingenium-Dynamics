<script setup lang="ts">
import { computed } from 'vue'
import { useLocalePath, useSeoMeta } from '#imports'
import {
  Laptop,
  Cpu,
  GitFork,
  BarChart3,
  ShieldCheck,
  Users,
  ArrowLeft,
  CheckCircle,
  Sparkles
} from 'lucide-vue-next'

import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import CardPremium from '~/components/ui/CardPremium.vue'
import { useI18n } from 'vue-i18n'

type SolutionKey =
  | 'web'
  | 'software'
  | 'automation'
  | 'data'
  | 'cloud'
  | 'consulting'

const props = defineProps<{
  solution: SolutionKey
}>()

const localePath = useLocalePath()

const config = {
  web: {
    icon: Laptop,
    glow: 'emerald',
    iconColor: 'text-brand-primary',
    bgColor: 'bg-brand-primary/10',
    borderColor: 'border-brand-primary/20',
    seoTitle: 'solutions.web.seoTitle',
    seoDescription: 'solutions.web.seoDescription'
  },

  software: {
    icon: Cpu,
    glow: 'blue',
    iconColor: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    borderColor: 'border-brand-blue/20',
    seoTitle: 'solutions.software.seoTitle',
    seoDescription: 'solutions.software.seoDescription'
  },

  automation: {
    icon: GitFork,
    glow: 'violet',
    iconColor: 'text-brand-accent',
    bgColor: 'bg-brand-accent/10',
    borderColor: 'border-brand-accent/20',
    seoTitle: 'solutions.automation.seoTitle',
    seoDescription: 'solutions.automation.seoDescription'
  },

  data: {
    icon: BarChart3,
    glow: 'emerald',
    iconColor: 'text-brand-primary',
    bgColor: 'bg-brand-primary/10',
    borderColor: 'border-brand-primary/20',
    seoTitle: 'solutions.data.seoTitle',
    seoDescription: 'solutions.data.seoDescription'
  },

  cloud: {
    icon: ShieldCheck,
    glow: 'blue',
    iconColor: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    borderColor: 'border-brand-blue/20',
    seoTitle: 'solutions.cloud.seoTitle',
    seoDescription: 'solutions.cloud.seoDescription'
  },

  consulting: {
    icon: Users,
    glow: 'violet',
    iconColor: 'text-brand-accent',
    bgColor: 'bg-brand-accent/10',
    borderColor: 'border-brand-accent/20',
    seoTitle: 'solutions.consulting.seoTitle',
    seoDescription: 'solutions.consulting.seoDescription'
  }
} as const

const current = computed(() => config[props.solution])

useSeoMeta({
  title: () => String(useI18n().t(current.value.seoTitle)),
  description: () => String(useI18n().t(current.value.seoDescription))
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden py-16 md:py-24 fhd:py-32">

    <div
      class="absolute left-10 top-20 opacity-15"
      :class="`neon-glow-${current.glow}`"
    />

    <div class="relative z-10 mx-auto max-w-5xl 2xl:max-w-6xl fhd:max-w-7xl px-6 fhd:px-12">

      <!-- Back -->
      <NuxtLink
        :to="localePath('/solutions')"
        class="mb-12 inline-flex items-center space-x-2 text-sm fhd:text-base font-display text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft class="h-4 w-4 fhd:h-5 fhd:w-5" />

        <span>
          {{ $t('solutions.detail.back') }}
        </span>
      </NuxtLink>

      <!-- Hero -->
      <div class="space-y-6">

        <div
          class="inline-block rounded-2xl border p-3 fhd:p-4"
          :class="[current.bgColor, current.borderColor]"
        >
          <component
            :is="current.icon"
            class="h-8 w-8 fhd:h-10 fhd:w-10"
            :class="current.iconColor"
          />
        </div>

        <h1
          class="font-display text-4xl font-extrabold tracking-tight text-gradient md:text-6xl fhd:text-7xl"
        >
          {{ $t(`solutions.${solution}.title`) }}
        </h1>

        <p class="font-sans text-lg fhd:text-xl leading-relaxed text-zinc-400 max-w-3xl fhd:max-w-5xl">
          {{ $t(`solutions.${solution}.desc`) }}
        </p>

      </div>

      <!-- Focus Areas -->
      <div class="mt-16 fhd:mt-24 grid grid-cols-1 md:grid-cols-2 fhd:grid-cols-3 gap-6 fhd:gap-8">

        <CardPremium
          v-for="(item, index) in $tm(`solutions.${solution}.items`)"
          :key="index"
          :glow-color="current.glow"
          class="flex flex-col justify-between p-6 fhd:p-8"
        >
          <div class="space-y-3">

            <h3
              class="flex items-center space-x-2.5 font-display text-lg fhd:text-xl font-bold text-zinc-100"
            >
              <CheckCircle
                class="h-5 w-5 fhd:h-6 fhd:w-6 flex-shrink-0"
                :class="current.iconColor"
              />

              <span>
                {{ $rt(item) }}
              </span>
            </h3>

            <p class="font-sans text-xs fhd:text-sm leading-relaxed text-zinc-400">
              {{ $t(`solutions.${solution}.itemDescription`) }}
            </p>

          </div>
        </CardPremium>

      </div>

      <!-- Technologies -->
      <div class="mt-16 fhd:mt-24 border-t border-white/5 pt-12 fhd:pt-16">

        <h3
          class="mb-6 font-display text-xs fhd:text-sm font-semibold uppercase tracking-wider text-zinc-400"
        >
          {{ $t('solutions.detail.technologies') }}
        </h3>

        <div class="flex flex-wrap gap-3 fhd:gap-4">

          <span
            v-for="(tech, index) in $tm(`solutions.${solution}.technologies`)"
            :key="index"
            class="rounded-lg border border-white/5 bg-zinc-950/40 px-3.5 py-2 fhd:px-4 fhd:py-2.5 font-display text-xs fhd:text-sm font-medium text-zinc-300"
          >
            {{ $rt(tech) }}
          </span>

        </div>

      </div>

      <!-- CTA -->
      <div
        class="mt-20 fhd:mt-28 space-y-6 rounded-3xl border border-white/5 bg-zinc-950/40 p-10 fhd:p-16 text-center"
      >

        <Sparkles
          class="mx-auto h-8 w-8 fhd:h-10 fhd:w-10"
          :class="current.iconColor"
        />

        <h3 class="font-display text-2xl md:text-3xl fhd:text-4xl font-bold text-zinc-100">
          {{ $t(`solutions.${solution}.ctaTitle`) }}
        </h3>

        <p
          class="mx-auto max-w-md fhd:max-w-xl text-sm md:text-base fhd:text-lg leading-relaxed text-zinc-400"
        >
          {{ $t(`solutions.${solution}.ctaDescription`) }}
        </p>

        <div class="pt-4">

          <ButtonPremium
            :to="localePath('/contact')"
            :variant="current.glow === 'blue' ? 'primary' : 'accent'"
          >
            {{ $t(`solutions.${solution}.ctaButton`) }}
          </ButtonPremium>

        </div>

      </div>

    </div>
  </div>
</template>