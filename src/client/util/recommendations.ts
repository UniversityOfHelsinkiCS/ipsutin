/* eslint-disable no-restricted-syntax */
import { FieldValues } from 'react-hook-form'
import { Recommendation } from '@backend/types'

type Scores = { [key: string]: number }

export const getRecommendationScores = (
  answers: FieldValues,
  recommendations: Recommendation[]
) => {
  const questionResponses: string[] = Object.values(answers)

  const recommendationScores: Scores = {}
  for (const recommendation of recommendations) {
    const { label, data: responseValues } = recommendation

    recommendationScores[label] = 0
    for (const response of questionResponses) {
      recommendationScores[label] += responseValues[response] || 0
    }
  }

  return recommendationScores
}

export const sortRecommendations = (
  recommendations: Recommendation[],
  scores: Scores
) =>
  recommendations
    .filter((rec: Recommendation) => scores[rec.label])
    .sort((a, b) => {
      const scoreA = scores[a.label]
      const scoreB = scores[b.label]

      if (scoreA < scoreB) return 1
      if (scoreA > scoreB) return -1
      return 0
    })

export const getRecommendationLabels = (recommendations: Recommendation[]) =>
  recommendations.map((recommendation) => recommendation.label)
