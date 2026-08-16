<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text' // 'text' | 'email' | 'textarea' | 'select'
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array as () => Array<{ value: string; label: string }>,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="block text-xs font-display font-medium uppercase tracking-wider text-zinc-400">
      {{ label }} <span v-if="required" class="text-brand-primary">*</span>
    </label>

    <div class="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-950/40 backdrop-blur-md transition-all duration-300 focus-within:border-brand-primary/40 focus-within:shadow-lg focus-within:shadow-brand-primary/5">
      <!-- Text Area -->
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        v-model="value"
        :required="required"
        :placeholder="placeholder"
        rows="4"
        class="w-full px-4 py-3 bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none resize-none font-sans text-sm"
      ></textarea>

      <!-- Select Dropdown -->
      <select
        v-else-if="type === 'select'"
        :id="id"
        v-model="value"
        :required="required"
        class="w-full px-4 py-3 bg-zinc-900 text-zinc-100 focus:outline-none font-sans text-sm appearance-none"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option 
          v-for="opt in options" 
          :key="opt.value" 
          :value="opt.value"
          class="bg-zinc-950 text-zinc-100"
        >
          {{ opt.label }}
        </option>
      </select>

      <!-- Standard Input -->
      <input
        v-else
        :id="id"
        :type="type"
        v-model="value"
        :required="required"
        :placeholder="placeholder"
        class="w-full px-4 py-3 bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none font-sans text-sm"
      />
      
      <!-- Custom select arrow icon -->
      <div v-if="type === 'select'" class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>
