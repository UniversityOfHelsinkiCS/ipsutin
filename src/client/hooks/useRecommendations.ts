import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'

const useRecommendations = (surveyId: number) => {
  const queryKey = ['recommendations', surveyId]

  const query = async (): Promise<any[]> => {
    const { data } = await apiClient.get(`/recommendations/${surveyId}`)

    return data
  }

  const { data: recommendations, ...rest } = useQuery(queryKey, query, {
    enabled: Boolean(surveyId),
  })

  return { recommendations, ...rest }
}

export default useRecommendations
