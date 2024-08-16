import axios from 'axios'

import { PUBLIC_URL } from '../../config'

const apiClient = axios.create({ baseURL: `${PUBLIC_URL}/api`, timeout: 7000 })

export const fetchStream = async (
  endpoint: string,
  requestBody: object
): Promise<ReadableStream<Uint8Array> | null> => {
  const url = `${PUBLIC_URL}/api/${endpoint}`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.body) {
      throw new Error('ReadableStream not supported or missing in response.')
    }

    return response.body // Return the ReadableStream
  } catch (error) {
    throw new Error('Error during fetch')
  }
}

export default apiClient
