import { useQuery } from 'react-query'
import { User, UserCount } from '@backend/types'

import apiClient from '../util/apiClient'

export const useLoggedInUser = () => {
  const queryKey = 'user'

  const query = async (): Promise<User> => {
    const { data } = await apiClient.get('/users')

    return data
  }

  const { data: user, ...rest } = useQuery(queryKey, query)

  return { user, ...rest }
}

export const useUserCounts = () => {
  const queryKey = ['userCounts']

  const query = async (): Promise<UserCount[]> => {
    const { data } = await apiClient.get('/analytics/counts/user')

    return data
  }

  const { data: userCounts, ...rest } = useQuery(queryKey, query)

  return { userCounts, ...rest }
}
