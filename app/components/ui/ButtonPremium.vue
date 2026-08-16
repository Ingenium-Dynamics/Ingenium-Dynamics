<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary' // 'primary' | 'secondary' | 'accent'
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonClass = computed(() => {
  if (props.variant === 'primary') {
    return 'btn-premium-primary'
  } else if (props.variant === 'secondary') {
    return 'btn-premium-secondary'
  } else if (props.variant === 'accent') {
    return 'relative inline-flex items-center justify-center px-6 py-3 font-display font-medium text-white transition-all duration-300 rounded-xl overflow-hidden bg-brand-accent shadow-lg shadow-brand-accent/10 hover:shadow-xl hover:shadow-brand-accent/30 active:scale-[0.98]'
  }
  return ''
})
</script>

<template>
  <!-- Internal Nuxt Link -->
  <NuxtLink 
    v-if="to" 
    :to="to" 
    :class="buttonClass"
  >
    <span class="relative z-10 flex items-center justify-center gap-2">
      <slot />
    </span>
  </NuxtLink>

  <!-- External Link -->
  <a 
    v-else-if="href" 
    :href="href" 
    target="_blank" 
    rel="noopener"
    :class="buttonClass"
  >
    <span class="relative z-10 flex items-center justify-center gap-2">
      <slot />
    </span>
  </a>

  <!-- Standard Button -->
  <button 
    v-else 
    :type="type" 
    :disabled="disabled"
    :class="[buttonClass, disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : '']"
  >
    <span class="relative z-10 flex items-center justify-center gap-2">
      <slot />
    </span>
  </button>
</template>
