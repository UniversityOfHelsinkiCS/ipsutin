import { Survey, SurveyCounts, SurveyName } from '@backend/types'
import { useQuery } from '@tanstack/react-query'

import apiClient from '../util/apiClient'

const useSurvey = (name: SurveyName) => {
  const queryKey = ['survey', name]

  const queryFn = async (): Promise<Survey> => {
    const { data } = await apiClient.get(`/surveys/${name}`)

    return data
  }

  const { data: survey, ...rest } = useQuery(queryKey, queryFn)

  return { survey, ...rest }
}

export const useSurveyCounts = () => {
  const queryKey = ['surveyCounts']

  const queryFn = async (): Promise<SurveyCounts[]> => {
    const { data } = await apiClient.get('/analytics/counts/survey')

    return data
  }

  const { data: surveyCounts, ...rest } = useQuery(queryKey, queryFn)

  return { surveyCounts, ...rest }
}

export default useSurvey
