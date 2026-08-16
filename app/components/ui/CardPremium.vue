<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  glowColor: {
    type: String,
    default: 'emerald' // 'emerald' | 'violet' | 'blue' | 'none'
  },
  hoverable: {
    type: Boolean,
    default: true
  }
})

const glowStyles = computed(() => {
  if (props.glowColor === 'emerald') {
    return 'group-hover:bg-brand-primary/10'
  } else if (props.glowColor === 'violet') {
    return 'group-hover:bg-brand-accent/10'
  } else if (props.glowColor === 'blue') {
    return 'group-hover:bg-brand-blue/10'
  }
  return ''
})

const borderGlowStyles = computed(() => {
  if (props.glowColor === 'emerald') {
    return 'group-hover:border-brand-primary/20'
  } else if (props.glowColor === 'violet') {
    return 'group-hover:border-brand-accent/20'
  } else if (props.glowColor === 'blue') {
    return 'group-hover:border-brand-blue/20'
  }
  return ''
})
</script>

<template>
  <div 
    class="group relative glass-card p-8 transition-all duration-500 overflow-hidden"
    :class="[
      hoverable ? 'hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-black/40' : '',
      borderGlowStyles
    ]"
  >
    <!-- Background glow hover effect -->
    <div 
      v-if="glowColor !== 'none'"
      class="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none filter blur-2xl"
      :class="glowStyles"
    ></div>

    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
