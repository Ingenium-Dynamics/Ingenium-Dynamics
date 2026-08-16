<script setup lang="ts">
import { useLocalePath, useSeoMeta } from '#imports'
import { Cpu, ArrowLeft, CheckCircle, Sparkles } from 'lucide-vue-next'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import CardPremium from '~/components/ui/CardPremium.vue'

const localePath = useLocalePath()

useSeoMeta({
  title: 'Custom Software & Web Applications',
  description: 'Design and engineering of powerful web applications, databases, REST/GraphQL APIs, and legacy system integrations.'
})

const techStack = ['Node.js', 'Python', 'Django', 'TypeScript', 'PostgreSQL', 'GraphQL', 'REST APIs', 'Docker']
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <!-- background glow -->
    <div class="absolute top-20 left-10 neon-glow-blue opacity-15"></div>

    <div class="max-w-4xl mx-auto px-6 relative z-10">
      <!-- Back to Solutions Link -->
      <NuxtLink :to="localePath('/solutions')" class="inline-flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-12 text-sm font-display">
        <ArrowLeft class="w-4 h-4" />
        <span>Back to Solutions</span>
      </NuxtLink>

      <!-- Hero Header -->
      <div class="space-y-6">
        <div class="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl inline-block">
          <Cpu class="w-8 h-8 text-brand-blue" />
        </div>
        <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight">
          {{ $t('solutions.software.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans">
          {{ $t('solutions.software.desc') }}
        </p>
      </div>

      <!-- Key Focus Areas -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardPremium 
          v-for="item in ($t('solutions.software.items') as any)" 
          :key="item"
          glow-color="blue"
          class="flex flex-col justify-between"
        >
          <div class="space-y-3">
            <h3 class="text-lg font-display font-bold text-zinc-100 flex items-center space-x-2">
              <CheckCircle class="w-5 h-5 text-brand-blue flex-shrink-0" />
              <span>{{ item }}</span>
            </h3>
            <p class="text-xs text-zinc-500 leading-relaxed font-sans">
              We design and construct clean, custom backend architectures and scalable frontend layouts. Every system includes solid authentication, granular permissions, optimized database design, and comprehensive API documentation.
            </p>
          </div>
        </CardPremium>
      </div>

      <!-- Tech Stack -->
      <div class="mt-16 border-t border-white/5 pt-12">
        <h3 class="text-sm font-display font-semibold uppercase tracking-wider text-zinc-400 mb-6">
          Technologies we excel in
        </h3>
        <div class="flex flex-wrap gap-3">
          <span 
            v-for="tech in techStack" 
            :key="tech"
            class="text-xs font-display font-medium px-3 py-1.5 rounded-lg border border-white/5 bg-zinc-950/40 text-zinc-300"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20 rounded-3xl border border-white/5 bg-zinc-950/40 p-10 text-center space-y-6">
        <Sparkles class="w-8 h-8 text-brand-blue mx-auto" />
        <h3 class="text-2xl font-display font-bold text-zinc-100">
          Have a complex application in mind?
        </h3>
        <p class="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          Tell us about the workflows, systems, or data structures you want to build. We build applications tailored exactly to your business logic.
        </p>
        <div class="pt-4">
          <ButtonPremium :to="localePath('/contact')" variant="accent">
            Start a software project
          </ButtonPremium>
        </div>
      </div>
    </div>
  </div>
</template>
