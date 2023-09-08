import { useQuery } from 'react-query'
import { Faculty } from '@backend/types'

import apiClient from '../util/apiClient'

export const useFaculties = () => {
  const queryKey = 'faculties'

  const query = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/faculties')

    return data
  }

  const { data: faculties, ...rest } = useQuery(queryKey, query)

  return { faculties, ...rest }
}

export const useFacultyCounts = () => {
  const queryKey = 'facultyCounts'

  const query = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/analytics/facultycounts')

    return data
  }

  const { data: facultyCounts, ...rest } = useQuery(queryKey, query)

  return { facultyCounts, ...rest }
}
