import { Result } from '@backend/types'
import { useQuery } from '@tanstack/react-query'

import apiClient from '../util/apiClient'

const useResults = (surveyId: number | undefined) => {
  const queryKey = ['results', surveyId]

  const queryFn = async (): Promise<Result[]> => {
    const { data } = await apiClient.get(`/results/${surveyId}`)

    return data
  }

  const { data: results, ...rest } = useQuery({
    queryKey,
    queryFn,
    enabled: Boolean(surveyId),
  })

  return { results, ...rest }
}

export default useResults
