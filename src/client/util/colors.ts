import { RecommendationLabel } from '@backend/types'

const colors: {
  [key in RecommendationLabel]?: { background: string; text: string }
} = {
  disclosure: { background: '#ed1975', text: 'black' },
  clinic: { background: '#8261a1', text: 'white' },
  relations: { background: '#23439b', text: 'white' },
  incubator: { background: '#199995', text: 'black' },
  legal: { background: '#afd255', text: 'black' },
  restrictive: { background: '#eb4034', text: 'black' },
  permissive: { background: '#f18235', text: 'black' },
}

export default colors
