import { RecommendationLabel } from '@backend/types'

const colors: { [key in RecommendationLabel]?: string } = {
  disclosure: '#ed1975',
  clinic: '#8261a1',
  relations: '#23439b',
  incubator: '#199995',
  legal: '#afd255',
  restrictive: '#eb4034',
  permissive: '#f18235',
}

export default colors
