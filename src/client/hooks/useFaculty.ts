import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'
import { Faculty } from '../types'

const useFaculties = () => {
  const queryKey = 'faculties'

  const query = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/faculties')

    return data
  }

  const { data: faculties, ...rest } = useQuery(queryKey, query)

  return { faculties, ...rest }
}

export default useFaculties
