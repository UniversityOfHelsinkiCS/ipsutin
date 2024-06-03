import { EntryWithSurvey } from '@backend/types'
import { useQuery } from '@tanstack/react-query'

import apiClient from '../util/apiClient'

export const useEntries = () => {
  const queryKey = ['entries']

  const queryFn = async (): Promise<EntryWithSurvey[]> => {
    const { data } = await apiClient.get(`/entries`)

    return data
  }

  const { data: entries, ...rest } = useQuery(queryKey, queryFn, {
    retry: false,
    useErrorBoundary: true,
  })

  return { entries, ...rest }
}

export const useEntry = (entryId: string | undefined) => {
  const queryKey = ['entry', entryId]

  const queryFn = async (): Promise<EntryWithSurvey> => {
    const { data } = await apiClient.get(`/entries/${entryId}`)

    return data
  }

  const { data: entry, ...rest } = useQuery(queryKey, queryFn, {
    enabled: !!entryId,
    retry: false,
    useErrorBoundary: true,
  })

  return { entry, ...rest }
}
