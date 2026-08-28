interface FaqItem {
  q: string
  a: string
}

export function useFaqJsonLd(scope: string) {
  const { tm } = useI18n()

  // <!-- FAQPage (schema.org): marca la sección de preguntas frecuentes para que
  // Google AI Overviews y otros motores la puedan citar como respuesta directa. -->
  const faqItems = computed(() => {
    const raw = tm(`faq.${scope}.questions`) as FaqItem[] | undefined
    return Array.isArray(raw) ? raw : []
  })

  useHead({
    script: computed(() => {
      const items = faqItems.value
      if (!items.length) return []

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: a
          }
        }))
      }

      return [
        {
          type: 'application/ld+json',
          key: `faq-jsonld-${scope}`,
          innerHTML: JSON.stringify(schema)
        }
      ]
    })
  })

  return { faqItems }
}
