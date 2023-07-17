import { useQuery } from 'react-query'

import { Result } from '@backend/types'

import apiClient from '../util/apiClient'

const useResults = (surveyId: number) => {
  const queryKey = ['results', surveyId]

  const query = async (): Promise<Result[]> => {
    const { data } = await apiClient.get(`/results/${surveyId}`)

    return data
  }

  const { data: results, ...rest } = useQuery(queryKey, query, {
    enabled: Boolean(surveyId),
  })

  return { results, ...rest }
}

export default useResults
