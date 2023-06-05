import { Recommendation } from '../models'
import getIeRecommendations from '../../data/ieRecommendations'
import getLicenseRecommendations from '../../data/licenseRecommendations'

const seedRecommendations = async () => {
  const ieRecommendations = getIeRecommendations()
  const licenseRecommendations = getLicenseRecommendations()

  const recommendations = [...ieRecommendations, ...licenseRecommendations]

  recommendations.forEach(async (recommendation) => {
    await Recommendation.upsert({
      ...recommendation,
    })
  })
}

export default seedRecommendations
