/**
 * Locale-aware route helpers using Nuxt i18n route names.
 * Required for custom localized paths (e.g. /en/web-development).
 */
export function useAppRoutes() {
  const localePath = useLocalePath()

  return {
    home: () => localePath({ name: 'index' }),
    solutions: () => localePath({ name: 'solutions' }),
    solution: (key: 'web' | 'software' | 'automation' | 'data' | 'cloud' | 'consulting') =>
      localePath({ name: `solutions-${key}` }),
    work: () => localePath({ name: 'work' }),
    workProject: (id: string) => localePath({ name: 'work-id', params: { id } }),
    about: () => localePath({ name: 'about' }),
    insights: () => localePath({ name: 'insights' }),
    contact: () => localePath({ name: 'contact' })
  }
}
