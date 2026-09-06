interface FaqItem {
  q: string
  a: string
}

export function useFaqJsonLd(scope: string) {
  const { tm, rt } = useI18n()

  // FAQPage (schema.org):
  // permite que Google y otros motores de respuesta
  // entiendan las preguntas y respuestas de la página.
  const faqItems = computed<FaqItem[]>(() => {
    const raw = tm(`faq.${scope}.questions`) as FaqItem[] | undefined

    if (!Array.isArray(raw)) {
      return []
    }

    return raw.map((item) => ({
      q: rt(item.q as any),
      a: rt(item.a as any)
    }))
  })

  useHead({
    script: computed(() => {
      const items = faqItems.value

      if (!items.length) {
        return []
      }

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