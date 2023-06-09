import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'
import { Survey } from '../types'

const useSurvey = (name: string) => {
  const queryKey = ['survey', name]

  const query = async (): Promise<Survey> => {
    const { data } = await apiClient.get(`/surveys/${name}`)

    return data
  }

  const { data: survey, ...rest } = useQuery(queryKey, query)

  return { survey, ...rest }
}

export default useSurvey
