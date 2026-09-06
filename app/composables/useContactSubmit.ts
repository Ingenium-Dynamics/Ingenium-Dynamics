import emailjs from '@emailjs/browser'

interface ContactFormData {
  name: string
  email: string
  company: string
  project_type: string
  need: string
  budget: string
  message: string
}

export function useContactSubmit() {
  const config = useRuntimeConfig()

  async function submitContactForm(data: ContactFormData): Promise<void> {
    // Validation
    if (!data.name || !data.email || !data.need || !data.project_type) {
      throw new Error('validation')
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      throw new Error('validation')
    }

    // EmailJS configuration
    const serviceId = String(config.public.emailjsServiceId || '')
    const templateId = String(config.public.emailjsTemplateId || '')
    const publicKey = String(config.public.emailjsPublicKey || '')

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('not_configured')
    }

    try {
      console.log('[EmailJS] Sending...')
      //await emailjs.send(
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          company: data.company || '—',
          project_type: data.project_type,
          need: data.need,
          budget: data.budget || '—',
          message: data.message || '—'
        },
        {
          publicKey
        }
        
      )
      console.log('[contact] EmailJS respondió:', response)
      console.log('[EmailJS] Sent successfully')
    } catch (error) {
      console.error('[contact] EmailJS error:', error)
      throw new Error('send_failed')
    }
  }

  return {
    submitContactForm
  }
}