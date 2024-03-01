import { useEffect } from 'react'
import { useQuery } from 'react-query'
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { Faculty } from '@backend/types'

import apiClient from '../util/apiClient'

export const useSelectedFaculty = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchParams] = useSearchParams()

  const faculty = searchParams.get('faculty')

  useEffect(() => {
    if (!faculty || faculty === 'null') return

    const params = { faculty }

    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(params)}`,
    })
  }, [faculty, location.pathname, navigate, searchParams])

  return faculty
}

export const useFaculties = () => {
  const queryKey = 'faculties'

  const query = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/faculties')

    return data
  }

  const { data: faculties, ...rest } = useQuery(queryKey, query)

  return { faculties, ...rest }
}

export const useUserFaculties = () => {
  const queryKey = 'userFaculties'

  const query = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/faculties/user')

    return data
  }

  const { data: userFaculties, ...rest } = useQuery(queryKey, query)

  return { userFaculties, ...rest }
}

export const useFacultyCounts = () => {
  const queryKey = 'facultyCounts'

  const query = async (): Promise<Faculty[]> => {
    const { data } = await apiClient.get('/analytics/counts/faculty')

    return data
  }

  const { data: facultyCounts, ...rest } = useQuery(queryKey, query)

  return { facultyCounts, ...rest }
}
