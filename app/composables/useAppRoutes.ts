export function useAppRoutes() {
  const localePath = useLocalePath()

  return {
    home: () => localePath({ name: 'index' }),

    solutions: () => localePath({ name: 'solutions' }),

    solution: (key: string) =>
      localePath({ name: `solutions-${key}` }),

    work: () =>
      localePath({
        name: 'work'
      }),

    workProject: (id: string) => {
      console.log('PROJECT ID:', id)

      return localePath({
        name: 'work-id',
        params: {
          id: String(id)
        }
      })
    },

    about: () => localePath({ name: 'about' }),

    insights: () => localePath({ name: 'insights' }),

    contact: () => localePath({ name: 'contact' })
  }
}