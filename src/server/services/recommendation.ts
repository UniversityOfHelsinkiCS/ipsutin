/* eslint-disable import/prefer-default-export */
import { Recommendation } from '../db/models'

export const getRecommendations = async (
  surveyId: string
): Promise<Recommendation[]> => {
  const recommendations = await Recommendation.findAll({
    where: {
      surveyId,
    },
  })

  return recommendations
}
