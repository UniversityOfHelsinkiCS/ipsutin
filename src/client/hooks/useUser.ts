import { useMutation, useQuery, useQueryClient } from 'react-query'
import { User, UserCount } from '@backend/types'

import { UserUpdates } from '../../validators/user'
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

export const useUpdatedUser = () => {
  const queryClient = useQueryClient()
  const { user } = useLoggedInUser()

  const mutation = useMutation(
    async (updates: UserUpdates) => {
      if (!user) {
        throw new Error('User information is not available')
      }

      const { data } = await apiClient.put(`/users/${user.id}`, updates)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    }
  )

  return mutation
}
