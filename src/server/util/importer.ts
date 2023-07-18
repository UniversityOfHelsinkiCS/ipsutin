import axios from 'axios'

import { API_TOKEN, IMPORTER_URL } from './config'

export const importerClient = axios.create({
  baseURL: IMPORTER_URL,
  params: {
    token: API_TOKEN,
  },
})

export const getCourses = async (userId: string): Promise<any[]> => {
  const { data } = await importerClient.get(`/courses/${userId}`)

  return data
}
