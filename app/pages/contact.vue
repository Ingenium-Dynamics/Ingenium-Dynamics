<script setup lang="ts">
import { ref } from 'vue'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from '@lucide/vue'
import ButtonPremium from '~/components/ui/ButtonPremium.vue'
import InputPremium from '~/components/ui/InputPremium.vue'

const { t, locale } = useI18n()
const { submitContactForm } = useContactSubmit()

// <!-- FAQPage (schema.org) para AEO: las preguntas frecuentes responden dudas
// comerciales directas y pueden ser citadas por Google AI Overviews. -->
const { faqItems } = useFaqJsonLd('contact')

useSeoMeta({
  title: () =>
    locale.value === 'fr'
      ? 'Contactez-nous | Démarrer une conversation'
      : locale.value === 'es'
        ? 'Contacto | Iniciar una conversación'
        : 'Contact Us | Start a Conversation',

  description: () =>
    locale.value === 'fr'
      ? 'Parlez-nous de votre projet de solutions numériques ou technologiques. Contactez notre équipe pour du développement web, logiciel, data ou cloud sur mesure.'
      : locale.value === 'es'
        ? 'Cuéntanos sobre tu proyecto de soluciones digitales o tecnología. Ponte en contacto con nuestro equipo para desarrollo web, software, datos o cloud a la medida.'
        : 'Tell us about your digital solutions or technology project. Get in touch with our team for custom web, software, data, or cloud development.'
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
const errorKey = ref<string | null>(null)

const onSubmit = async () => {
  isSending.value = true
  submitStatus.value = 'idle'
  errorKey.value = null

  try {
    await submitContactForm(form.value)
    submitStatus.value = 'success'
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
    submitStatus.value = 'error'
    if (error instanceof Error) {
      errorKey.value = error.message
    }
  } finally {
    isSending.value = false
  }
}

const errorMessage = computed(() => {
  if (errorKey.value === 'rate_limit') return t('contact.form.error_rate_limit')
  if (errorKey.value === 'not_configured') return t('contact.form.error_config')
  return t('contact.form.error')
})
</script>

<template>
  <div class="relative min-h-screen py-16 md:py-24 overflow-hidden animate-fade-in">
    <div class="absolute top-20 right-10 neon-glow-violet opacity-10"></div>
    <div class="absolute bottom-20 left-10 neon-glow-emerald opacity-10"></div>

    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
      <div class="lg:col-span-5 space-y-8 flex flex-col justify-center">
        <div class="space-y-4">
          <span class="text-xs font-display font-semibold uppercase tracking-wider text-brand-primary">
            {{ $t('contact.eyebrow') }}
          </span>
          <h1 class="text-4xl md:text-6xl font-display font-extrabold text-gradient tracking-tight leading-tight">
            {{ $t('contact.title') }}
          </h1>
          <p class="text-zinc-400 text-lg leading-relaxed font-sans">
            {{ $t('contact.description') }}
          </p>
        </div>

        <div class="space-y-6 pt-6">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-brand-primary">
              <Mail class="w-5 h-5" />
            </div>
            <div>
              <span class="block text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-500">{{ $t('contact.email_label') }}</span>
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
              <span class="block text-[10px] font-display font-semibold uppercase tracking-wider text-zinc-500">{{ $t('contact.location_label') }}</span>
              <span class="text-sm font-medium text-zinc-300">
                {{ $t('contact.location') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7">
        <div class="glass-card p-8 md:p-12 bg-zinc-950/20 border-white/5">
          <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputPremium
                id="name"
                v-model="form.name"
                :label="$t('contact.form.name')"
                required
              />

              <InputPremium
                id="email"
                v-model="form.email"
                type="email"
                :label="$t('contact.form.email')"
                required
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputPremium
                id="company"
                v-model="form.company"
                :label="$t('contact.form.company')"
              />

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

            <InputPremium
              id="need"
              v-model="form.need"
              type="textarea"
              :label="$t('contact.form.need')"
              required
              :placeholder="$t('contact.form.need_placeholder')"
            />

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

            <InputPremium
              id="message"
              v-model="form.message"
              type="textarea"
              :label="$t('contact.form.message')"
              :placeholder="$t('contact.form.message_placeholder')"
            />

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
              <span>{{ errorMessage }}</span>
            </div>

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

    <!-- FAQ: <section> con preguntas en <h3> interrogativos. Cada pregunta y
         respuesta coincide con el JSON-LD FAQPage inyectado en <head>, lo que
         refuerza la señal de AEO para los AI Overviews. -->
    <section
      v-if="faqItems.length"
      aria-labelledby="contact-faq-heading"
      class="max-w-7xl mx-auto px-6 pt-20"
    >
      <h2 id="contact-faq-heading" class="font-display text-2xl md:text-3xl font-bold text-zinc-100">
        {{ $t('faq.title') }}
      </h2>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <article
          v-for="(item, index) in faqItems"
          :key="index"
          class="rounded-2xl border border-white/5 bg-zinc-950/20 p-6"
        >
          <h3 class="font-display text-base font-bold text-zinc-100">
            {{ item.q }}
          </h3>
          <p class="mt-2 font-sans text-sm leading-relaxed text-zinc-400">
            {{ item.a }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
