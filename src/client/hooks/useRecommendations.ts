import { Recommendation } from '@backend/types'
import { useQuery } from '@tanstack/react-query'

import apiClient from '../util/apiClient'

const useRecommendations = (surveyId: number | undefined) => {
  const queryKey = ['recommendations', surveyId]

  const query = async (): Promise<Recommendation[]> => {
    const { data } = await apiClient.get(`/recommendations/${surveyId}`)

    return data
  }

  const { data: recommendations, ...rest } = useQuery(queryKey, query, {
    enabled: Boolean(surveyId),
  })

  return { recommendations, ...rest }
}

export default useRecommendations
