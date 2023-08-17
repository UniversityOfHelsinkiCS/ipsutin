import { useQuery } from 'react-query'
import { UserCount } from '@backend/types'

import apiClient from '../util/apiClient'

const useUserCounts = () => {
  const queryKey = ['userCounts']

  const query = async (): Promise<UserCount[]> => {
    const { data } = await apiClient.get('/users/userCounts')

    return data
  }

  const { data: userCounts, ...rest } = useQuery(queryKey, query)

  return { userCounts, ...rest }
}

export default useUserCounts
