import { Recommendation } from '../models'
import getRecommendationsData from '../../data/recommendations'
import getIeRecommendations from '../../data/ieRecommendations'

const seedRecommendations = async () => {
  const recommendations: any[] = getRecommendationsData()
  const ieRecommendations: any[] = getIeRecommendations()

  recommendations.forEach(async (recommendation) => {
    await Recommendation.upsert({
      ...recommendation,
    })
  })

  ieRecommendations.forEach(async (recommendation) => {
    await Recommendation.upsert({
      ...recommendation,
    })
  })
}

export default seedRecommendations
