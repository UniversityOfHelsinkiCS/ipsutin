import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'
import { User } from '../types'

const useLoggedInUser = () => {
  const queryKey = 'user'

  const query = async (): Promise<User> => {
    const { data } = await apiClient.get('/users/login')

    return data
  }

  const { data: user, ...rest } = useQuery(queryKey, query)

  return { user, ...rest }
}

export default useLoggedInUser
