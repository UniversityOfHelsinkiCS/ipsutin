import { Recommendation } from '../models'
import getIeRecommendations from '../../data/ieRecommendations'
import getLicenceRecommendations from '../../data/licenceRecommendations'

const seedRecommendations = async () => {
  const ieRecommendations = getIeRecommendations()
  const licenceRecommendations = getLicenceRecommendations()

  const recommendations = [...ieRecommendations, ...licenceRecommendations]

  recommendations.forEach(async (recommendation) => {
    await Recommendation.upsert({
      ...recommendation,
    })
  })
}

export default seedRecommendations
