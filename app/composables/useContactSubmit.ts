interface ContactFormData {
  name: string
  email: string
  company: string
  project_type: string
  need: string
  budget: string
  message: string
}

declare global {
  interface Window {
    AWS?: {
      config: {
        region: string
        credentials: unknown
      }
      CognitoIdentityCredentials: new (options: { IdentityPoolId: string }) => unknown
      SNS: new () => {
        publish: (
          params: { Message: string; TopicArn: string },
          callback: (err: Error | null, data?: { MessageId: string }) => void
        ) => void
      }
    }
  }
}

const RATE_LIMIT = 3
const TIME_WINDOW_MS = 3_600_000

function checkRateLimit(): { allowed: boolean; message?: string } {
  if (!import.meta.client) return { allowed: true }

  const now = Date.now()
  const stored = localStorage.getItem('ib_contact_rate')
  let rateData = stored ? JSON.parse(stored) : { count: 0, timestamp: now }

  if (now - rateData.timestamp > TIME_WINDOW_MS) {
    rateData = { count: 0, timestamp: now }
  }

  if (rateData.count >= RATE_LIMIT) {
    return { allowed: false, message: 'rate_limit' }
  }

  rateData.count++
  localStorage.setItem('ib_contact_rate', JSON.stringify(rateData))
  return { allowed: true }
}

function loadAwsSdk(): Promise<NonNullable<Window['AWS']>> {
  return new Promise((resolve, reject) => {
    if (window.AWS) {
      resolve(window.AWS)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://sdk.amazonaws.com/js/aws-sdk-2.1692.0.min.js'
    script.async = true
    script.onload = () => {
      if (window.AWS) resolve(window.AWS)
      else reject(new Error('AWS SDK failed to load'))
    }
    script.onerror = () => reject(new Error('AWS SDK failed to load'))
    document.head.appendChild(script)
  })
}

function buildMessage(data: ContactFormData): string {
  const lines = [
    'Nuevo mensaje de contacto — Ingenium Bright',
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Empresa: ${data.company || '—'}`,
    `Tipo de proyecto: ${data.project_type}`,
    `Necesidad: ${data.need}`,
    `Presupuesto: ${data.budget || '—'}`,
    `Mensaje: ${data.message || '—'}`
  ]
  return lines.join('\n')
}

export function useContactSubmit() {
  const config = useRuntimeConfig()

  async function submitContactForm(data: ContactFormData): Promise<void> {
    if (!data.name || !data.email || !data.need || !data.project_type) {
      throw new Error('validation')
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      throw new Error('validation')
    }

    const rateCheck = checkRateLimit()
    if (!rateCheck.allowed) {
      throw new Error('rate_limit')
    }

    const region = config.public.awsRegion as string
    const identityPoolId = config.public.awsIdentityPoolId as string
    const topicArn = config.public.awsSnsTopicArn as string

    if (!region || !identityPoolId || !topicArn) {
      throw new Error('not_configured')
    }

    const AWS = await loadAwsSdk()
    AWS.config.region = region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId
    })

    const sns = new AWS.SNS()
    const params = {
      Message: buildMessage(data),
      TopicArn: topicArn
    }

    await new Promise<void>((resolve, reject) => {
      sns.publish(params, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  return { submitContactForm }
}
