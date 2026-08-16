<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex items-center space-x-2 border-l border-white/10 pl-4 ml-4">
    <NuxtLink
      v-for="loc in locales"
      :key="typeof loc === 'string' ? loc : loc.code"
      :to="switchLocalePath(typeof loc === 'string' ? loc : loc.code)"
      class="text-xs font-display font-medium tracking-wider uppercase transition-colors duration-200"
      :class="(typeof loc === 'string' ? loc : loc.code) === locale 
        ? 'text-brand-primary font-semibold' 
        : 'text-zinc-400 hover:text-zinc-200'"
    >
      {{ typeof loc === 'string' ? loc : loc.code }}
    </NuxtLink>
  </div>
</template>
