import { useQuery } from 'react-query'

import { Survey, SurveyName } from '../types'
import apiClient from '../util/apiClient'

const useSurvey = (name: SurveyName) => {
  const queryKey = ['survey', name]

  const query = async (): Promise<Survey> => {
    const { data } = await apiClient.get(`/surveys/${name}`)

    return data
  }

  const { data: survey, ...rest } = useQuery(queryKey, query)

  return { survey, ...rest }
}

export default useSurvey
