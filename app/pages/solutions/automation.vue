<script setup lang="ts">
import { useLocalePath, useSeoMeta } from '#imports'
import { GitFork, ArrowLeft, CheckCircle, Sparkles } from 'lucide-vue-next'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import CardPremium from '~/components/ui/CardPremium.vue'

const localePath = useLocalePath()

useSeoMeta({
  title: 'Automation & AI Solutions',
  description: 'Optimize your business processes, connect systems through APIs, and integrate advanced AI capabilities to boost efficiency.'
})

const techStack = ['n8n', 'Make.com', 'Python', 'OpenAI API', 'LangChain', 'Custom Webhooks', 'Zapier', 'API Integrations']
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <!-- background glow -->
    <div class="absolute top-20 left-10 neon-glow-violet opacity-15"></div>

    <div class="max-w-4xl mx-auto px-6 relative z-10">
      <!-- Back to Solutions Link -->
      <NuxtLink :to="localePath('/solutions')" class="inline-flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-12 text-sm font-display">
        <ArrowLeft class="w-4 h-4" />
        <span>Back to Solutions</span>
      </NuxtLink>

      <!-- Hero Header -->
      <div class="space-y-6">
        <div class="p-3 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl inline-block">
          <GitFork class="w-8 h-8 text-brand-accent" />
        </div>
        <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight">
          {{ $t('solutions.automation.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans">
          {{ $t('solutions.automation.desc') }}
        </p>
      </div>

      <!-- Key Focus Areas -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardPremium 
          v-for="item in ($t('solutions.automation.items') as any)" 
          :key="item"
          glow-color="violet"
          class="flex flex-col justify-between"
        >
          <div class="space-y-3">
            <h3 class="text-lg font-display font-bold text-zinc-100 flex items-center space-x-2">
              <CheckCircle class="w-5 h-5 text-brand-accent flex-shrink-0" />
              <span>{{ item }}</span>
            </h3>
            <p class="text-xs text-zinc-500 leading-relaxed font-sans">
              We connect your tools (CRM, ERP, Billing, Email, Slack) so data flows automatically. We design smart, automated workflows that eliminate manual data entry, and integrate custom AI models for advanced content processing, extraction, or automated reasoning.
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
        <Sparkles class="w-8 h-8 text-brand-accent mx-auto" />
        <h3 class="text-2xl font-display font-bold text-zinc-100">
          Ready to automate repetitive manual work?
        </h3>
        <p class="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          Let's discuss your current manual processes or the AI concepts you'd like to implement. We create workflows that run quietly in the background.
        </p>
        <div class="pt-4">
          <ButtonPremium :to="localePath('/contact')" variant="accent">
            Start an automation project
          </ButtonPremium>
        </div>
      </div>
    </div>
  </div>
</template>
