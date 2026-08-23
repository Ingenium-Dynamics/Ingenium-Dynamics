export interface PortfolioProject {
  id: string
  cover: string
  images: string[]
  web: string
  color: 'emerald' | 'blue' | 'violet'
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
{
  id: 'el-fogon-de-la-llave',
  cover: '/img/portfolio/el_fogon_de_la_llave.jpg',
  images: [
    '/img/portfolio/el_fogon_de_la_llave.jpg',
    '/img/portfolio/el_fogon_de_la_llave01.jpg'
  ],
  web: 'https://www.elfogondelallave.cl/',
  color: 'emerald'
},
  {
    id: 'languagelife',
    cover: '/img/portfolio/languagelife1.webp',
    images: [
      '/img/portfolio/languagelife1.webp',
      '/img/portfolio/languagelife2.webp',
      '/img/portfolio/languagelife3.webp',
      '/img/portfolio/languagelife4.webp'
    ],
    web: 'https://www.languageartlife.com/index.html',
    color: 'blue'
  },
  {
    id: 'vincentalize',
    cover: '/img/portfolio/vincentalize.png',
    images: [
      '/img/portfolio/vincentalize.png',
      '/img/portfolio/vincentalize01.jpg'
    ],
    web: 'https://www.vincentalize.ca/',
    color: 'violet'
  },
  {
  id: 'movil-technology',
  cover: '/img/portfolio/moviltechnology.png',
  images: [
    '/img/portfolio/moviltechnology.png'
  ],
  web: 'https://moviltechnology.ingeniumbright.com/',
  color: 'blue'
},
  {
    id: 'nico-castro',
    cover: '/img/portfolio/nicocastro1.webp',
    images: [
      '/img/portfolio/nicocastro1.webp',
      '/img/portfolio/nicocastro2.webp',
      '/img/portfolio/nicocastro3.webp'
    ],
    web: 'https://dyw57mjcdz9b2.cloudfront.net/',
    color: 'emerald'
  },
  {
    id: 'fidias-place',
    cover: '/img/portfolio/fidias1.webp',
    images: [
      '/img/portfolio/fidias1.webp',
      '/img/portfolio/fidias2.webp',
      '/img/portfolio/fidias3.webp',
      '/img/portfolio/fidias4.webp'
    ],
    web: 'https://ingenium-dynamics.github.io/fidias/index2.html',
    color: 'blue'
  },
  {
    id: 'j-avila',
    cover: '/img/portfolio/j-avila-01.webp',
    images: [
      '/img/portfolio/j-avila-01.webp',
      '/img/portfolio/j-avila-02.webp',
      '/img/portfolio/j-avila-03.webp'
    ],
    web: 'https://www.j-avila.com',
    color: 'violet'
  }
]

export const PORTFOLIO_PROJECT_IDS = PORTFOLIO_PROJECTS.map(p => p.id)

export function getProjectById(id: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find(p => p.id === id)
}
