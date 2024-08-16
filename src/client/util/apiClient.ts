import axios from 'axios'

import { PUBLIC_URL } from '../../config'

const apiClient = axios.create({ baseURL: `${PUBLIC_URL}/api`, timeout: 15000 })

export const fetchStream = async (
  endpoint: string,
  requestBody: object
): Promise<{
  stream: ReadableStream<Uint8Array> | null
  error: string | null
}> => {
  const url = `${PUBLIC_URL}/api/${endpoint}`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      return { stream: null, error: `HTTP error! Status: ${response.status}` }
    }

    if (!response.body) {
      return {
        stream: null,
        error: 'ReadableStream not supported or missing in response.',
      }
    }
    return { stream: response.body, error: null }
  } catch (error: any) {
    return { stream: null, error: error.message || 'Error during fetch' }
  }
}

export default apiClient
