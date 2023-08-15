import { useQuery } from 'react-query'

import { EntryWithSurvey } from '../types'
import apiClient from '../util/apiClient'

export const useEntries = () => {
  const queryKey = ['entries']

  const query = async (): Promise<EntryWithSurvey[]> => {
    const { data } = await apiClient.get(`/entries`)

    return data
  }

  const { data: entries, ...rest } = useQuery(queryKey, query, {
    retry: false,
    useErrorBoundary: true,
  })

  return { entries, ...rest }
}

export const useEntry = (entryId: string | undefined) => {
  const queryKey = ['entry', entryId]

  const query = async (): Promise<EntryWithSurvey> => {
    const { data } = await apiClient.get(`/entries/${entryId}`)

    return data
  }

  const { data: entry, ...rest } = useQuery(queryKey, query, {
    enabled: !!entryId,
    retry: false,
    useErrorBoundary: true,
  })

  return { entry, ...rest }
}
