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
const { t } = useI18n()

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
  title: () => String(t(current.value.seoTitle)),
  description: () => String(t(current.value.seoDescription))
})

// <!-- Se usa <section> + <article> en lugar de <div> para que la IA identifique
// la sección FAQ como contenido de preguntas y respuestas (AEO). El JSON-LD
// FAQPage se inyecta en <head> para alimentar directamente a los AI Overviews. -->
const { faqItems } = useFaqJsonLd(props.solution)
</script>

<template>
  <div class="relative min-h-screen overflow-hidden py-16 md:py-24">

    <div
      class="absolute left-10 top-20 opacity-15"
      :class="`neon-glow-${current.glow}`"
    />

    <div class="relative z-10 mx-auto max-w-4xl px-6">

      <!-- Back: se usa el nombre de ruta ({ name: 'solutions' }) para que
           localePath lo resuelva con el prefijo de idioma correcto en EN/FR/ES -->
      <NuxtLink
        :to="localePath({ name: 'solutions' })"
        class="mb-12 inline-flex items-center space-x-2 text-sm font-display text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft class="h-4 w-4" />

        <span>
          {{ $t('solutions.detail.back') }}
        </span>
      </NuxtLink>

      <!-- Hero -->
      <div class="space-y-6">

        <div
          class="inline-block rounded-2xl border p-3"
          :class="[current.bgColor, current.borderColor]"
        >
          <component
            :is="current.icon"
            class="h-8 w-8"
            :class="current.iconColor"
          />
        </div>

        <h1
          class="font-display text-4xl font-extrabold tracking-tight text-gradient md:text-6xl"
        >
          {{ $t(`solutions.${solution}.title`) }}
        </h1>

        <p class="font-sans text-lg leading-relaxed text-zinc-400">
          {{ $t(`solutions.${solution}.desc`) }}
        </p>

      </div>

      <!-- Focus Areas -->
      <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">

  <CardPremium
    v-for="(item, index) in $tm(`solutions.${solution}.items`)"
    :key="index"
    :glow-color="current.glow"
    class="flex flex-col justify-between"
  >
    <div class="space-y-3">

      <h3
        class="flex items-center space-x-2 font-display text-lg font-bold text-zinc-100"
      >
        <CheckCircle
          class="h-5 w-5 flex-shrink-0"
          :class="current.iconColor"
        />

        <span>
          {{ $rt(item) }}
        </span>
      </h3>

      <p class="font-sans text-xs leading-relaxed text-zinc-500">
        {{ $t(`solutions.${solution}.itemDescription`) }}
      </p>

    </div>
  </CardPremium>

</div>
      <!-- Technologies -->
      <section class="mt-16 space-y-6">
        <h2 class="font-display text-2xl font-bold text-zinc-100">
          {{ $t('detail.technologies') }}
        </h2>
        <div class="flex flex-wrap gap-3">

  <span
    v-for="(tech, index) in $tm(`solutions.${solution}.technologies`)"
    :key="index"
    class="rounded-lg border border-white/5 bg-zinc-950/40 px-3 py-1.5 font-display text-xs font-medium text-zinc-300"
  >
    {{ $rt(tech) }}
  </span>

</div>
      </section>

      <!-- FAQ -->
      <section
        v-if="faqItems.length"
        aria-labelledby="faq-heading"
        class="mt-20 space-y-8 border-t border-white/5 pt-16"
      >
        <h2 id="faq-heading" class="font-display text-2xl font-bold text-zinc-100">
          {{ $t('faq.title') }}
        </h2>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article
            v-for="(item, index) in faqItems"
            :key="index"
            class="rounded-2xl border border-white/5 bg-zinc-950/40 p-6"
          >
            <h3 class="font-display text-base font-bold text-zinc-100">
              {{ item.q }}
            </h3>
            <p class="mt-2 font-sans text-sm leading-relaxed text-zinc-400">
              {{ item.a }}
            </p>
          </article>
        </div>
      </section>

      <!-- CTA -->
      <div
        class="mt-20 space-y-6 rounded-3xl border border-white/5 bg-zinc-950/40 p-10 text-center"
      >

        <Sparkles
          class="mx-auto h-8 w-8"
          :class="current.iconColor"
        />

        <h3 class="font-display text-2xl font-bold text-zinc-100">
          {{ $t(`solutions.${solution}.ctaTitle`) }}
        </h3>

        <p
          class="mx-auto max-w-md text-sm leading-relaxed text-zinc-400"
        >
          {{ $t(`solutions.${solution}.ctaDescription`) }}
        </p>

        <div class="pt-4">

          <ButtonPremium
            :to="localePath({ name: 'contact' })"
            :variant="current.glow === 'blue' ? 'primary' : 'accent'"
          >
            {{ $t(`solutions.${solution}.ctaButton`) }}
          </ButtonPremium>

        </div>

      </div>

    </div>
  </div>
</template>