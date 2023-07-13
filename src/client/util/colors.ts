import { RecommendationLabel } from '../types'

const colors: { [key in RecommendationLabel]?: string } = {
  disclosure: '#ed1975',
  clinic: '#8261a1',
  relations: '#23439b',
  incubator: '#199995',
  legal: '#afd255',
  gnu_gpl: '#eb4034',
  bsd_mit: '#f18235',
}

export default colors
