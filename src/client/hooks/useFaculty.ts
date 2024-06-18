import { Faculty } from '@backend/types'
import { useQuery } from '@tanstack/react-query'

import apiClient from '../util/apiClient'

export const useFaculties = () => {
  const queryKey = ['faculties']

  const queryFn = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/faculties')

    return data
  }

  const { data: faculties, ...rest } = useQuery({ queryKey, queryFn })

  return { faculties, ...rest }
}

export const useUserFaculties = () => {
  const queryKey = ['userFaculties']

  const queryFn = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/faculties/user')

    return data
  }

  const { data: userFaculties, ...rest } = useQuery({ queryKey, queryFn })

  return { userFaculties, ...rest }
}

export const useFacultyCounts = () => {
  const queryKey = ['facultyCounts']

  const queryFn = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/analytics/counts/faculty')

    return data
  }

  const { data: facultyCounts, ...rest } = useQuery({ queryKey, queryFn })

  return { facultyCounts, ...rest }
}
