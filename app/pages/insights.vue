<script setup lang="ts">
import { useLocalePath, useSeoMeta } from '#imports'
import { Instagram, Sparkles, BookOpen, Clock } from 'lucide-vue-next'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import CardPremium from '~/components/ui/CardPremium.vue'

const localePath = useLocalePath()

useSeoMeta({
  title: 'Insights & Technical Updates',
  description: 'Read the latest trends in web engineering, custom software development, cloud security, and business automation strategy.'
})

const placeholderArticles = [
  {
    title: 'Moving Away from Bloated Templates: The Case for Custom Frameworks',
    category: 'Web Engineering',
    readTime: '4 min read',
    date: 'Aug 2026'
  },
  {
    title: 'How n8n and Make.com Can Automate 80% of Core Admin Tasks',
    category: 'Automation & AI',
    readTime: '6 min read',
    date: 'Jul 2026'
  }
]
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden">
    <!-- background glow -->
    <div class="absolute top-20 right-10 neon-glow-emerald opacity-10"></div>

    <div class="max-w-4xl mx-auto px-6 relative z-10 space-y-20">
      <!-- Header -->
      <div class="space-y-6">
        <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
          {{ $t('insights.tagline') }}
        </span>
        <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight">
          {{ $t('insights.title') }}
        </h1>
        <p class="text-zinc-400 text-lg leading-relaxed font-sans">
          {{ $t('insights.desc') }}
        </p>
      </div>

      <!-- Instagram Showcase Banner -->
      <div class="relative rounded-3xl border border-white/5 bg-zinc-950/20 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div class="space-y-4 relative z-10 text-center md:text-left">
          <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs text-brand-primary">
            <Instagram class="w-4 h-4" />
            <span>{{ $t('insights.handle') }}</span>
          </div>
          <h3 class="text-2xl font-display font-bold text-zinc-100">
            Join our community on Instagram
          </h3>
          <p class="text-sm text-zinc-500 max-w-sm leading-relaxed font-sans">
            We post tips, process clips, UI snapshots, and tech strategy breakdowns directly on our profile.
          </p>
        </div>

        <div class="relative z-10 flex-shrink-0 w-full md:w-auto">
          <ButtonPremium href="https://www.instagram.com/ingenium_bright/" variant="primary" class="w-full md:w-auto">
            <Instagram class="w-4 h-4 mr-1" />
            <span>{{ $t('insights.cta') }}</span>
          </ButtonPremium>
        </div>
      </div>

      <!-- Future Articles Placeholder -->
      <div class="border-t border-white/5 pt-16 space-y-8">
        <h2 class="text-2xl font-display font-bold text-zinc-100 flex items-center space-x-2">
          <BookOpen class="w-6 h-6 text-brand-primary" />
          <span>Technical Insights</span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardPremium 
            v-for="art in placeholderArticles" 
            :key="art.title"
            glow-color="none"
            class="flex flex-col justify-between h-full bg-zinc-950/20"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between text-xs text-zinc-500">
                <span>{{ art.category }}</span>
                <span class="flex items-center space-x-1">
                  <Clock class="w-3.5 h-3.5" />
                  <span>{{ art.readTime }}</span>
                </span>
              </div>
              <h3 class="text-lg font-display font-bold text-zinc-200 leading-snug">
                {{ art.title }}
              </h3>
            </div>
            
            <div class="mt-8 pt-4 border-t border-white/5 text-[10px] text-zinc-600 font-sans">
              Published: {{ art.date }}
            </div>
          </CardPremium>
        </div>
      </div>
    </div>
  </div>
</template>
