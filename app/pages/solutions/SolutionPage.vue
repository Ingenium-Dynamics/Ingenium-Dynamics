<script setup lang="ts">
import {
  Laptop,
  Code2,
  GitFork,
  BarChart3,
  Cloud,
  Compass,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-vue-next'

const props = defineProps<{
  solution: 'web' | 'software' | 'automation' | 'data' | 'cloud' | 'consulting'
  icon: string
  accent: 'emerald' | 'violet' | 'blue'
  techStack: string[]
}>()

const localePath = useLocalePath()
const { t, tm } = useI18n()

const iconMap = {
  Laptop,
  Code2,
  GitFork,
  BarChart3,
  Cloud,
  Compass
}

const iconComponent = computed(() => iconMap[props.icon as keyof typeof iconMap])

const items = computed(() => {
  return tm(`solutions.${props.solution}.items`) as Array<{
    title: string
    description: string
  }>
})

const accentClasses = computed(() => {
  const map = {
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      glow: 'neon-glow-emerald',
      button: 'primary'
    },
    violet: {
      text: 'text-violet-400',
      bg: 'bg-violet-400/10',
      border: 'border-violet-400/20',
      glow: 'neon-glow-violet',
      button: 'accent'
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20',
      glow: 'neon-glow-blue',
      button: 'primary'
    }
  }

  return map[props.accent]
})

useSeoMeta({
  title: () => t(`solutions.${props.solution}.metaTitle`),
  description: () => t(`solutions.${props.solution}.metaDescription`)
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden py-16 md:py-24">

    <!-- Ambient glow -->
    <div
      class="absolute left-0 top-24 h-72 w-72 rounded-full blur-3xl opacity-10"
      :class="accentClasses.glow"
    />

    <div class="relative z-10 mx-auto max-w-6xl px-6">

      <!-- Back -->
      <NuxtLink
        :to="localePath({ name: 'solutions' })"
        class="mb-12 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-white"
      >
        <ArrowLeft class="h-4 w-4" />
        {{ t('solutions.back') }}
      </NuxtLink>

      <!-- Hero -->
      <section class="max-w-4xl">

        <div
          class="mb-7 inline-flex rounded-2xl border p-3"
          :class="[accentClasses.bg, accentClasses.border]"
        >
          <component
            :is="iconComponent"
            class="h-8 w-8"
            :class="accentClasses.text"
          />
        </div>

        <p
          class="text-xs font-semibold uppercase tracking-[0.22em]"
          :class="accentClasses.text"
        >
          {{ t(`solutions.${props.solution}.eyebrow`) }}
        </p>

        <h1
          class="mt-5 text-4xl font-display font-extrabold tracking-tight text-white md:text-6xl"
        >
          {{ t(`solutions.${props.solution}.title`) }}
        </h1>

        <p class="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          {{ t(`solutions.${props.solution}.desc`) }}
        </p>

      </section>

      <!-- Services -->
      <section class="mt-20">

        <div class="mb-8">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em]"
            :class="accentClasses.text"
          >
            {{ t('solutions.focusLabel') }}
          </p>

          <h2 class="mt-3 text-2xl font-bold text-white md:text-3xl">
            {{ t(`solutions.${props.solution}.focusTitle`) }}
          </h2>
        </div>

        <div class="grid gap-5 md:grid-cols-2">

          <article
            v-for="(item, index) in items"
            :key="index"
            class="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045]"
          >

            <div class="flex items-start gap-5">

              <span
                class="text-xs font-semibold"
                :class="accentClasses.text"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <div>
                <h3 class="text-lg font-semibold text-white">
                  {{ item.title }}
                </h3>

                <p class="mt-3 text-sm leading-7 text-zinc-500">
                  {{ item.description }}
                </p>
              </div>

            </div>

          </article>

        </div>

      </section>

      <!-- Technology -->
      <section class="mt-20 border-t border-white/10 pt-12">

        <p
          class="text-xs font-semibold uppercase tracking-[0.2em]"
          :class="accentClasses.text"
        >
          {{ t('solutions.technologyLabel') }}
        </p>

        <h2 class="mt-3 text-2xl font-bold text-white">
          {{ t('solutions.technologyTitle') }}
        </h2>

        <div class="mt-7 flex flex-wrap gap-3">

          <span
            v-for="tech in props.techStack"
            :key="tech"
            class="rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-2 text-xs font-medium text-zinc-300"
          >
            {{ tech }}
          </span>

        </div>

      </section>

      <!-- CTA -->
      <section
        class="mt-20 rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-center md:p-12"
      >

        <Sparkles
          class="mx-auto h-8 w-8"
          :class="accentClasses.text"
        />

        <h2 class="mt-5 text-2xl font-bold text-white md:text-3xl">
          {{ t(`solutions.${props.solution}.ctaTitle`) }}
        </h2>

        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
          {{ t(`solutions.${props.solution}.ctaDescription`) }}
        </p>

        <NuxtLink
          :to="localePath({ name: 'contact' })"
          class="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02]"
        >
          {{ t('solutions.cta') }}

          <ArrowRight class="h-4 w-4" />
        </NuxtLink>

      </section>

    </div>
  </main>
</template>