import { useMutation } from 'react-query'
import { FormValues } from '../types'

import apiClient from '../util/apiClient'

const useSaveEntryMutation = (surveyId: number) => {
  const mutationFn = async (data: FormValues) => {
    const sessionToken = sessionStorage.getItem('sessionToken')

    await apiClient.post(`/entries/${surveyId}`, {
      data,
      sessionToken,
    })
  }

  const mutation = useMutation(mutationFn)

  return mutation
}

export default useSaveEntryMutation
