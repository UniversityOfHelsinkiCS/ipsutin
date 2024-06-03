import { User, UserCount } from '@backend/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UserUpdates } from '../../validators/user'
import apiClient from '../util/apiClient'

export const useLoggedInUser = () => {
  const queryKey = ['user']

  const queryFn = async (): Promise<User> => {
    const { data } = await apiClient.get('/users')
    return data
  }

  const { data: user, ...rest } = useQuery({ queryKey, queryFn })
  return { user, ...rest }
}

export const useUserCounts = () => {
  const queryKey = ['userCounts']

  const queryFn = async (): Promise<UserCount[]> => {
    const { data } = await apiClient.get('/analytics/counts/user')

    return data
  }

  const { data: userCounts, ...rest } = useQuery({ queryKey, queryFn })

  return { userCounts, ...rest }
}

export const useUpdatedUser = () => {
  const queryKey = ['user']
  const queryClient = useQueryClient()
  const { user } = useLoggedInUser()

  const mutationFn = async (updates: UserUpdates) => {
    if (!user) {
      throw new Error('User information is not available')
    }

    const { data } = await apiClient.put(`/users/${user.id}`, updates)
    return data
  }

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return mutation
}
