import { Message } from 'react-hook-form'

export const getCompletionStream = async (
  messages: Message[],
  model: string
) => {
  const body = {
    options: {
      messages: [...messages],
      model,
    },
  }

  try {
    const response = await fetch(
      'http://localhost:3001/api/ai/stream/innotin',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const stream = response.body as unknown as ReadableStream

    return { stream }
  } catch (error) {
    const message = error.response?.data || 'Something went wrong'
    throw new Error(message)
  }
}

export const FirstStepMessageSend = async (
  ideaTopic: string,
  ideaIndustry: string,
  ideaOrigin: string,
  model: string
) => {
  const body = {
    options: {
      ideaTopic,
      ideaIndustry,
      ideaOrigin,
      model,
    },
  }

  try {
    const response = await fetch(
      'http://localhost:3001/api/ai/stream/inventorstep1',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const stream = response.body as unknown as ReadableStream
    return { stream }
  } catch (error) {
    const message = error.response?.data || 'Something went wrong'
    throw new Error(message)
  }
}
