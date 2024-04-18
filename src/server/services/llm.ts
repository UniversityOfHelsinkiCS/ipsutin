import { CURRE_URL } from '../../config'
import { Message } from '../types'

export const getCompletionStream = async (
  allMessages: Message[],
  model: string
) => {
  const body = {
    options: {
      messages: [...allMessages],
      model,
    },
  }

  const response = await fetch(`${CURRE_URL}/api/ai/stream/innotin`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })

  const stream = response.body as unknown as ReadableStream

  return { stream }
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
  const response = await fetch(
    `http://${CURRE_URL}/api/ai/stream/inventorstep1`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }
  )

  const stream = response.body as unknown as ReadableStream
  return { stream }
}
