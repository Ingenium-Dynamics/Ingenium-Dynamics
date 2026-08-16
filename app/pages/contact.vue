<script setup lang="ts">
import { ref } from 'vue'
import { useLocalePath, useSeoMeta, useRuntimeConfig } from '#imports'
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-vue-next'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import InputPremium from '~/components/ui/InputPremium.vue'

const localePath = useLocalePath()

useSeoMeta({
  title: "Contact Us | Start a Conversation",
  description: "Tell us about your digital solutions or technology project. Get in touch with our team for custom web, software, data, or cloud development."
})

const form = ref({
  name: '',
  email: '',
  company: '',
  project_type: '',
  need: '',
  budget: '',
  message: ''
})

const isSending = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const onSubmit = async () => {
  isSending.value = true
  submitStatus.value = 'idle'

  try {
    // In a real production environment, the user can configure a contact endpoint
    // We will submit the form data to an endpoint or log it
    // For local and static builds, we use a placeholder or runtimeConfig
    const endpoint = '/api/contact' // Or external web service URL
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Submitted Form Data:', form.value)
    
    submitStatus.value = 'success'
    // Reset form
    form.value = {
      name: '',
      email: '',
      company: '',
      project_type: '',
      need: '',
      budget: '',
      message: ''
    }
  } catch (error) {
    console.error('Submission error:', error)
    submitStatus.value = 'error'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden animate-fade-in">
    <!-- background ambient glow -->
    <div class="absolute top-20 right-10 neon-glow-violet opacity-10"></div>
    <div class="absolute bottom-20 left-10 neon-glow-emerald opacity-10"></div>

    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
      <!-- 1. Text & Contact info -->
      <div class="lg:col-span-5 space-y-8 flex flex-col justify-center">
        <div class="space-y-4">
          <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
            {{ $t('contact.tagline') }}
          </span>
          <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight leading-tight">
            Let's talk about <br />your project.
          </h1>
          <p class="text-zinc-400 text-lg leading-relaxed font-sans">
            {{ $t('contact.desc') }}
          </p>
        </div>

        <div class="space-y-6 pt-6">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-brand-primary">
              <Mail class="w-5 h-5" />
            </div>
            <div>
              <span class="block text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-500">Email</span>
              <a href="mailto:info@ingeniumbright.com" class="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                info@ingeniumbright.com
              </a>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-brand-primary">
              <MapPin class="w-5 h-5" />
            </div>
            <div>
              <span class="block text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-500">Location</span>
              <span class="text-sm font-medium text-zinc-300">
                Québec, Canada &bull; Global
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Contact form card -->
      <div class="lg:col-span-7">
        <div class="glass-card p-8 md:p-12 bg-zinc-950/20 border-white/5">
          <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <InputPremium
                id="name"
                v-model="form.name"
                :label="$t('contact.form.name')"
                required
                placeholder="John Doe"
              />

              <!-- Email -->
              <InputPremium
                id="email"
                v-model="form.email"
                type="email"
                :label="$t('contact.form.email')"
                required
                placeholder="john@company.com"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Company -->
              <InputPremium
                id="company"
                v-model="form.company"
                :label="$t('contact.form.company')"
                placeholder="Acme Corp (Optional)"
              />

              <!-- Project Type -->
              <InputPremium
                id="project_type"
                v-model="form.project_type"
                type="select"
                :label="$t('contact.form.project_type')"
                required
                :placeholder="$t('contact.form.project_type_placeholder')"
                :options="[
                  { value: 'web', label: $t('contact.form.web_dev') },
                  { value: 'software', label: $t('contact.form.custom_software') },
                  { value: 'automation', label: $t('contact.form.automation') },
                  { value: 'other', label: $t('contact.form.other') }
                ]"
              />
            </div>

            <!-- What do you need? -->
            <InputPremium
              id="need"
              v-model="form.need"
              type="textarea"
              :label="$t('contact.form.need')"
              required
              :placeholder="$t('contact.form.need_placeholder')"
            />

            <!-- Budget range -->
            <InputPremium
              id="budget"
              v-model="form.budget"
              type="select"
              :label="$t('contact.form.budget')"
              :placeholder="$t('contact.form.budget_placeholder')"
              :options="[
                { value: 'under-2k', label: $t('contact.form.budget_1') },
                { value: '2k-5k', label: $t('contact.form.budget_2') },
                { value: '5k-10k', label: $t('contact.form.budget_3') },
                { value: 'over-10k', label: $t('contact.form.budget_4') }
              ]"
            />

            <!-- Message (Optional) -->
            <InputPremium
              id="message"
              v-model="form.message"
              type="textarea"
              :label="$t('contact.form.message')"
              :placeholder="$t('contact.form.message_placeholder')"
            />

            <!-- Success/Error Feedback Messages -->
            <div 
              v-if="submitStatus === 'success'" 
              class="flex items-start space-x-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-sans"
            >
              <CheckCircle2 class="w-5 h-5 flex-shrink-0" />
              <span>{{ $t('contact.form.success') }}</span>
            </div>

            <div 
              v-if="submitStatus === 'error'" 
              class="flex items-start space-x-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-sans"
            >
              <AlertCircle class="w-5 h-5 flex-shrink-0" />
              <span>{{ $t('contact.form.error') }}</span>
            </div>

            <!-- Submit button -->
            <div class="pt-4">
              <ButtonPremium 
                type="submit" 
                variant="primary" 
                :disabled="isSending"
                class="w-full flex items-center justify-center space-x-2"
              >
                <Send class="w-4 h-4" v-if="!isSending" />
                <span>{{ isSending ? $t('contact.form.sending') : $t('contact.form.submit') }}</span>
              </ButtonPremium>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
