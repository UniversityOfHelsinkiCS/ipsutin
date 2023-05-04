import { Recommendation } from '../models'
import getIeRecommendations from '../../data/ieRecommendations'

const seedRecommendations = async () => {
  const ieRecommendations: any[] = getIeRecommendations()

  ieRecommendations.forEach(async (recommendation) => {
    await Recommendation.upsert({
      ...recommendation,
    })
  })
}

export default seedRecommendations
