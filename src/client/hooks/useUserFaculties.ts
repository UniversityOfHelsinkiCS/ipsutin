import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'

import { Faculty } from '../types'

const useUserFaculties = () => {
  const queryKey = 'userFaculties'

  const query = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/faculties/user')

    return data
  }

  const { data: userFaculties, ...rest } = useQuery(queryKey, query)

  return { userFaculties, ...rest }
}

export default useUserFaculties
