<script setup lang="ts">
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
} from '@lucide/vue'
import { PORTFOLIO_PROJECTS } from '~/data/projects'
const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 3)
const localePath = useLocalePath()
const { locale } = useI18n()

const solutionsList = [
  {
    key: 'web',
    route: 'solutions-web',
    icon: Laptop,
    accent: 'emerald'
  },
  {
    key: 'software',
    route: 'solutions-software',
    icon: Cpu,
    accent: 'blue'
  },
  {
    key: 'automation',
    route: 'solutions-automation',
    icon: GitFork,
    accent: 'violet'
  },
  {
    key: 'data',
    route: 'solutions-data',
    icon: BarChart3,
    accent: 'emerald'
  },
  {
    key: 'cloud',
    route: 'solutions-cloud',
    icon: ShieldCheck,
    accent: 'blue'
  },
  {
    key: 'consulting',
    route: 'solutions-consulting',
    icon: Users,
    accent: 'violet'
  }
] as const

const capabilities = [
  {
    key: 'web',
    icon: Laptop
  },
  {
    key: 'software',
    icon: Cpu
  },
  {
    key: 'automation',
    icon: GitFork
  },
  {
    key: 'data',
    icon: BarChart3
  },
  {
    key: 'cloud',
    icon: ShieldCheck
  },
  {
    key: 'consulting',
    icon: Users
  }
] as const

const processSteps = [
  {
    key: 'discover',
    icon: Compass
  },
  {
    key: 'design',
    icon: Layers
  },
  {
    key: 'build',
    icon: Zap
  },
  {
    key: 'grow',
    icon: Sparkles
  }
] as const

const whyItems = [
  {
    key: 'businessFirst',
    icon: Users
  },
  {
    key: 'fullStack',
    icon: Cpu
  },
  {
    key: 'scalable',
    icon: Layers
  },
  {
    key: 'partner',
    icon: Sparkles
  }
] as const

const projects = [
  {
    id:'vincentalize',
    key: 'vincentalize',
    image: '/img/portfolio/vincentalize.png'
  },
  {
    id: 'languagelife',
    key: 'languagelife',
    image: '/img/portfolio/languagelife1.webp'
  },
  {
    id: 'el-fogon-de-la-llave',
    key: 'el-fogon-de-la-llave',
    image: '/img/portfolio/el_fogon_de_la_llave.jpg'
  }
] as const

useSeoMeta({
  title: () =>
    locale.value === 'fr'
      ? 'Ingenium Bright | Solutions numériques & technologies'
      : locale.value === 'es'
        ? 'Ingenium Bright | Soluciones digitales & tecnología'
        : 'Ingenium Bright | Digital Solutions & Technology',

  description: () =>
    locale.value === 'fr'
      ? 'Nous concevons et développons des solutions numériques adaptées aux entreprises : sites web, logiciels, automatisation, données et cloud.'
      : locale.value === 'es'
        ? 'Diseñamos y desarrollamos soluciones digitales para empresas: sitios web, software, automatización, datos y cloud.'
        : 'We design and build digital solutions for businesses — from websites and software to automation, data and cloud.',

  ogTitle: () =>
    locale.value === 'fr'
      ? 'Ingenium Bright | Solutions numériques & technologies'
      : locale.value === 'es'
        ? 'Ingenium Bright | Soluciones digitales & tecnología'
        : 'Ingenium Bright | Digital Solutions & Technology',

  ogDescription: () =>
    locale.value === 'fr'
      ? 'Solutions numériques, développement logiciel, automatisation, données et cloud.'
      : locale.value === 'es'
        ? 'Soluciones digitales, desarrollo de software, automatización, datos y cloud.'
        : 'Digital solutions, software development, automation, data and cloud.',

  ogImage: '/img/Logo_V3/Ingenium_1.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">

    <!-- Ambient background -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div class="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div class="absolute bottom-1/4 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
    </div>

    <!-- ====================================================== -->
    <!-- HERO -->
    <!-- ====================================================== -->

    <section
      class="relative mx-auto flex max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] flex-col items-center px-6 2xl:px-10 fhd:px-12 pb-24 pt-16 text-center md:pb-32 md:pt-24 fhd:pb-40 fhd:pt-32"
    >
      <div
        class="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 backdrop-blur"
      >
        <Sparkles class="h-4 w-4 text-emerald-400" />
        <span>{{ $t('hero.eyebrow') }}</span>
      </div>

      <h1
        class="max-w-5xl fhd:max-w-6xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl fhd:text-8xl"
      >
        {{ $t('hero.title') }}
      </h1>

      <p
        class="mt-8 max-w-2xl fhd:max-w-3xl text-base leading-8 text-zinc-400 md:text-xl fhd:text-2xl fhd:leading-10"
      >
        {{ $t('hero.description') }}
      </p>

      <div
        class="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
      >
        <NuxtLink
          :to="localePath('contact')"
          class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 fhd:px-9 fhd:py-4 text-sm fhd:text-base font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-zinc-200 sm:w-auto"
        >
          {{ $t('hero.primaryCta') }}

          <ArrowRight
            class="h-4 w-4 fhd:h-5 fhd:w-5 transition-transform group-hover:translate-x-1"
          />
        </NuxtLink>

        <NuxtLink
          :to="localePath({ name: 'work' })"
          class="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 fhd:px-9 fhd:py-4 text-sm fhd:text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
        >
          {{ $t('hero.secondaryCta') }}
        </NuxtLink>
      </div>

      <!-- Capability strip -->
      <div
        class="mt-20 fhd:mt-28 grid w-full grid-cols-2 border-y border-white/5 md:grid-cols-3 lg:grid-cols-6"
      >
        <div
          v-for="item in capabilities"
          :key="item.key"
          class="flex items-center justify-center gap-2 border-white/5 px-4 py-5 fhd:py-7 text-xs fhd:text-sm font-medium text-zinc-500 md:border-r last:border-r-0"
        >
          <component
            :is="item.icon"
            class="h-4 w-4 fhd:h-5 fhd:w-5"
          />

          <span>
            {{ $t(`hero.capabilities.${item.key}`) }}
          </span>
        </div>
      </div>
    </section>

    <!-- ====================================================== -->
    <!-- INTRO -->
    <!-- ====================================================== -->

    <section
      class="relative border-y border-white/5 bg-white/[0.015]"
    >
      <div
        class="mx-auto grid max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] gap-10 px-6 2xl:px-10 fhd:px-12 py-24 md:py-28 fhd:py-36 lg:grid-cols-12 lg:items-center"
      >
        <div class="lg:col-span-5">
          <span
            class="text-xs fhd:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
          >
            {{ $t('intro.eyebrow') }}
          </span>

          <h2
            class="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl fhd:text-6xl"
          >
            {{ $t('intro.title') }}
          </h2>
        </div>

        <div class="lg:col-span-6 lg:col-start-7">
          <p class="text-lg md:text-xl fhd:text-2xl leading-8 fhd:leading-10 text-zinc-400">
            {{ $t('intro.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ====================================================== -->
    <!-- SOLUTIONS -->
    <!-- ====================================================== -->

    <section
      id="solutions"
      class="relative mx-auto max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] px-6 2xl:px-10 fhd:px-12 py-24 md:py-32 fhd:py-40"
    >
      <div class="mx-auto mb-16 fhd:mb-24 max-w-3xl fhd:max-w-4xl text-center">
        <span
          class="text-xs fhd:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
        >
          {{ $t('solutions.eyebrow') }}
        </span>

        <h2
          class="mt-5 text-3xl font-bold tracking-tight text-white md:text-5xl fhd:text-6xl"
        >
          {{ $t('solutions.title') }}
        </h2>

        <p class="mt-6 text-base md:text-lg fhd:text-xl leading-7 fhd:leading-8 text-zinc-400">
          {{ $t('solutions.description') }}
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 fhd:gap-8">
        <article
          v-for="solution in solutionsList"
          :key="solution.key"
          class="group relative flex min-h-[300px] fhd:min-h-[350px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 fhd:p-9 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
        >
          <div>
            <div
              class="mb-6 flex h-11 w-11 fhd:h-14 fhd:w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]"
            >
              <component
                :is="solution.icon"
                class="h-5 w-5 fhd:h-7 fhd:w-7 text-zinc-200"
              />
            </div>

            <h3 class="text-xl fhd:text-2xl font-semibold text-white">
              {{ $t(`solutions.${solution.key}.title`) }}
            </h3>

            <p class="mt-3 text-sm fhd:text-base leading-6 fhd:leading-7 text-zinc-400">
              {{ $t(`solutions.${solution.key}.description`) }}
            </p>
          </div>

          <div class="mt-8">
            <div class="mb-5 flex flex-wrap gap-2">
              <span
                v-for="(item, index) in $tm(`solutions.${solution.key}.items`)"
                :key="`${solution.key}-${index}`"
                class="rounded-full border border-white/5 bg-white/[0.04] px-2.5 py-1 fhd:px-3 fhd:py-1.5 text-[11px] fhd:text-xs text-zinc-400"
              >
                {{ $rt(item) }}
              </span>
            </div>

            <NuxtLink
              :to="localePath(solution.route)"
              class="group/link inline-flex items-center gap-2 text-sm fhd:text-base font-medium text-white"
            >
              {{ $t(`solutions.${solution.key}.cta`) }}

              <ArrowRight
                class="h-4 w-4 fhd:h-5 fhd:w-5 transition-transform group-hover/link:translate-x-1"
              />
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- ====================================================== -->
    <!-- ====================================================== -->
    <!-- WORK -->
    <!-- ====================================================== -->
<section
  id="work"
  class="border-y border-white/5 bg-white/[0.015] py-24 md:py-32 fhd:py-40"
>
  <div class="mx-auto max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] px-6 2xl:px-10 fhd:px-12">

    <!-- Header -->
    <div
      class="mb-14 fhd:mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end"
    >
      <div class="max-w-2xl fhd:max-w-3xl">
        <span
          class="text-xs fhd:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
        >
          {{ $t('portfolio.tagline') }}
        </span>

        <h2 class="mt-5 text-3xl font-bold text-white md:text-5xl fhd:text-6xl">
          {{ $t('portfolio.title') }}
        </h2>

        <p class="mt-5 text-base md:text-lg fhd:text-xl leading-7 fhd:leading-8 text-zinc-400">
          {{ $t('portfolio.description') }}
        </p>
      </div>

      <!-- Ver todos -->
      <NuxtLink
        :to="localePath({ name: 'work' })"
        class="group inline-flex shrink-0 items-center gap-2 text-sm fhd:text-base font-semibold text-white transition-colors hover:text-emerald-400"
      >
        {{ $t('portfolio.viewAll') }}

        <ArrowRight
          class="h-4 w-4 fhd:h-5 fhd:w-5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </NuxtLink>
    </div>

    <!-- Projects -->
    <div class="grid gap-6 md:grid-cols-3 fhd:gap-8">

<NuxtLink
  v-for="project in projects"
  :key="project.id"
  :to="`${localePath('work')}/${project.id}`"
        class="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
      >

        <!-- Image: <figure> + <figcaption> semántico; la IA relaciona la imagen
             con su pie de figura para entender el contexto visual -->
        <figure class="aspect-[16/10] overflow-hidden bg-zinc-900">
          <NuxtImg
            :src="project.image"
            :alt="$t(`portfolio.projects.${project.key}.title`)"
            format="webp"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <figcaption class="sr-only">
            {{ $t(`portfolio.projects.${project.key}.title`) }}
          </figcaption>
        </figure>

        <!-- Content -->
        <div class="p-6 fhd:p-8">

          <p
            class="text-xs fhd:text-sm uppercase tracking-wider text-emerald-400"
          >
            {{ $t(`portfolio.projects.${project.key}.category`) }}
          </p>

          <h3 class="mt-2 text-xl fhd:text-2xl font-semibold text-white">
            {{ $t(`portfolio.projects.${project.key}.title`) }}
          </h3>

          <p class="mt-3 text-sm fhd:text-base leading-6 fhd:leading-7 text-zinc-400">
            {{ $t(`portfolio.projects.${project.key}.description`) }}
          </p>

          <!-- CTA -->
          <span
            class="mt-5 inline-flex items-center gap-2 text-sm fhd:text-base font-medium text-white transition-colors group-hover:text-emerald-400"
          >
            {{ $t('portfolio.cta_view') }}

            <ArrowRight
              class="h-4 w-4 fhd:h-5 fhd:w-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>

        </div>
      </NuxtLink>

    </div>
  </div>
</section>

<!-- ====================================================== -->
    <!-- PROCESS -->
    <!-- ====================================================== -->

    <section class="mx-auto max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] px-6 2xl:px-10 fhd:px-12 py-24 md:py-32 fhd:py-40">

      <div class="mx-auto mb-16 fhd:mb-24 max-w-3xl fhd:max-w-4xl text-center">

        <span
          class="text-xs fhd:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
        >
          {{ $t('process.eyebrow') }}
        </span>

        <h2 class="mt-5 text-3xl font-bold text-white md:text-5xl fhd:text-6xl">
          {{ $t('process.title') }}
        </h2>

      </div>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4 fhd:gap-8">

        <article
          v-for="step in processSteps"
          :key="step.key"
          class="rounded-2xl border border-white/10 bg-white/[0.025] p-7 fhd:p-9"
        >

          <div class="flex items-center justify-between">

            <span class="text-5xl fhd:text-6xl font-bold text-white/[0.07]">
              {{ $t(`process.${step.key}.number`) }}
            </span>

            <component
              :is="step.icon"
              class="h-5 w-5 fhd:h-7 fhd:w-7 text-emerald-400"
            />

          </div>

          <h3 class="mt-7 text-lg fhd:text-xl font-semibold text-white">
            {{ $t(`process.${step.key}.title`) }}
          </h3>

          <p class="mt-3 text-sm fhd:text-base leading-6 fhd:leading-7 text-zinc-400">
            {{ $t(`process.${step.key}.description`) }}
          </p>

        </article>

      </div>
    </section>

    <!-- ====================================================== -->
    <!-- WHY -->
    <!-- ====================================================== -->

    <section class="border-y border-white/5 bg-white/[0.015]">

      <div
        class="mx-auto grid max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] gap-14 px-6 2xl:px-10 fhd:px-12 py-24 md:py-32 fhd:py-40 lg:grid-cols-12 lg:items-center"
      >

        <div class="lg:col-span-5">

          <span
            class="text-xs fhd:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
          >
            {{ $t('why.eyebrow') }}
          </span>

          <h2
            class="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl fhd:text-6xl"
          >
            {{ $t('why.title') }}
          </h2>

          <NuxtLink
            :to="localePath('about')"
            class="mt-8 inline-flex items-center gap-2 text-sm fhd:text-base font-semibold text-white"
          >
            {{ $t('about.cta') }}

            <ArrowRight class="h-4 w-4 fhd:h-5 fhd:w-5" />
          </NuxtLink>

        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:col-span-7 fhd:gap-8">

          <article
            v-for="item in whyItems"
            :key="item.key"
            class="rounded-2xl border border-white/10 bg-zinc-950/50 p-6 fhd:p-8"
          >

            <component
              :is="item.icon"
              class="h-5 w-5 fhd:h-7 fhd:w-7 text-emerald-400"
            />

            <h3 class="mt-5 text-lg fhd:text-xl font-semibold text-white">
              {{ $t(`why.${item.key}.title`) }}
            </h3>

            <p class="mt-3 text-sm fhd:text-base leading-6 fhd:leading-7 text-zinc-400">
              {{ $t(`why.${item.key}.description`) }}
            </p>

          </article>

        </div>

      </div>
    </section>

    <!-- ====================================================== -->
    <!-- INSIGHTS -->
    <!-- ====================================================== -->

    <section class="mx-auto max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] px-6 2xl:px-10 fhd:px-12 py-24 md:py-32 fhd:py-40">

      <div
        class="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-14 fhd:p-18"
      >

        <div
          class="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
        >

          <div class="max-w-2xl fhd:max-w-3xl">

            <span
              class="text-xs fhd:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
            >
              {{ $t('insights.eyebrow') }}
            </span>

            <h2 class="mt-5 text-3xl font-bold text-white md:text-4xl fhd:text-5xl">
              {{ $t('insights.title') }}
            </h2>

            <p class="mt-5 text-base fhd:text-lg leading-7 fhd:leading-8 text-zinc-400">
              {{ $t('insights.description') }}
            </p>

          </div>

          <a
            href="https://www.instagram.com/ingenium_bright/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 fhd:px-8 fhd:py-4 text-sm fhd:text-base font-semibold text-white transition hover:bg-white/[0.08]"
          >
            <span class="font-bold">@</span>

            <span>
              {{ $t('insights.instagramHandle') }}
            </span>

            <span class="text-zinc-500">
              ·
            </span>

            <span>
              {{ $t('insights.instagram') }}
            </span>
          </a>

        </div>

      </div>
    </section>

    <!-- ====================================================== -->
    <!-- FINAL CTA -->
    <!-- ====================================================== -->

    <section class="mx-auto max-w-7xl 2xl:max-w-[1536px] fhd:max-w-[1680px] px-6 2xl:px-10 fhd:px-12 pb-24 md:pb-32 fhd:pb-40">

      <div
        class="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 px-8 py-16 text-center md:px-16 md:py-24 fhd:py-32"
      >

        <div
          class="pointer-events-none absolute inset-0 opacity-30"
          style="background-image: radial-gradient(circle at center, rgba(16,185,129,.18), transparent 45%);"
        />

        <div class="relative mx-auto max-w-2xl fhd:max-w-3xl">

          <span
            class="text-xs fhd:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
          >
            {{ $t('contact.eyebrow') }}
          </span>

          <h2 class="mt-5 text-3xl font-bold text-white md:text-5xl fhd:text-6xl">
            {{ $t('contact.title') }}
          </h2>

          <p class="mx-auto mt-6 max-w-xl fhd:max-w-2xl text-base fhd:text-lg leading-7 fhd:leading-8 text-zinc-400">
            {{ $t('contact.description') }}
          </p>

          <NuxtLink
            :to="localePath('contact')"
            class="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 fhd:px-9 fhd:py-4 text-sm fhd:text-base font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-zinc-200"
          >
            {{ $t('contact.cta') }}

            <ArrowRight class="h-4 w-4 fhd:h-5 fhd:w-5" />
          </NuxtLink>

        </div>

      </div>
    </section>

  </div>
</template>