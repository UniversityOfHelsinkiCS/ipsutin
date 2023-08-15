import getAssessmentRecommendations from '../../data/assessmentRecommendations'
import getIeRecommendations from '../../data/ieRecommendations'
import getLicenceRecommendations from '../../data/licenceRecommendations'
import { Recommendation } from '../models'

const seedRecommendations = async () => {
  const ieRecommendations = getIeRecommendations()
  const licenceRecommendations = getLicenceRecommendations()
  const assessmentRecommendations = getAssessmentRecommendations()

  const recommendations = [
    ...assessmentRecommendations,
    ...ieRecommendations,
    ...licenceRecommendations,
  ]

  recommendations.forEach(async (recommendation) => {
    await Recommendation.upsert({
      ...recommendation,
    })
  })
}

export default seedRecommendations
