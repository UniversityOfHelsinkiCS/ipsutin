import { Recommendation } from '../models'
import getIeRecommendations from '../../data/ieRecommendations'
import getLicenseRecommendations from '../../data/licenseRecommendations'
import getAssessmentRecommendations from '../../data/assessmentRecommendations'

const seedRecommendations = async () => {
  const ieRecommendations = getIeRecommendations()
  const licenseRecommendations = getLicenseRecommendations()
  const assessmentRecommendations = getAssessmentRecommendations()

  const recommendations = [
    ...assessmentRecommendations,
    ...ieRecommendations,
    ...licenseRecommendations,
  ]

  recommendations.forEach(async (recommendation) => {
    await Recommendation.upsert({
      ...recommendation,
    })
  })
}

export default seedRecommendations
