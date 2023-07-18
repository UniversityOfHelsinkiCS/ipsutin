import { useMutation } from 'react-query'

import { FormValues } from '../types'
import apiClient from '../util/apiClient'

const useSaveEntryMutation = (surveyId: number) => {
  const mutationFn = async (data: FormValues) => {
    let sessionToken = sessionStorage.getItem('sessionToken')

    if (!sessionToken) {
      const sessionId = Math.random().toString(16).slice(2)
      sessionStorage.setItem('sessionToken', sessionId)
      sessionToken = sessionId
    }

    await apiClient.post(`/entries/${surveyId}`, {
      data,
      sessionToken,
    })
  }

  const mutation = useMutation(mutationFn)

  return mutation
}

export default useSaveEntryMutation
