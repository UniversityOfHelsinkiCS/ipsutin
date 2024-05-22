/* eslint-disable no-restricted-syntax */
import {
  AzureKeyCredential,
  ChatCompletions,
  EventStream,
  OpenAIClient,
} from '@azure/openai'

import { CURRE_URL, validModels } from '../../config'
import { getPromptById } from '../data/inventorPrompts'
import {
  APIError,
  AzureOptions,
  InputValidation,
  Message,
  ValidatedInput,
} from '../types'
import {
  AZURE_API_KEY,
  AZURE_RESOURCE,
  CURRE_API_PASSWORD,
} from '../util/config'
import logger from '../util/logger'

const endpoint = `https://${AZURE_RESOURCE}.openai.azure.com/`

const client = new OpenAIClient(endpoint, new AzureKeyCredential(AZURE_API_KEY))

export const getCompletion = async (
  allMessages: Message[],
  model: string
): Promise<string> => {
  const body = {
    options: {
      messages: [...allMessages],
      model,
      CURRE_API_PASSWORD_INNOTIN: CURRE_API_PASSWORD,
    },
  }
  const response = await fetch(`${CURRE_URL}/api/ai/stream/innotin`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
  console.log('RESPONSE: ', response)
  const content = await response.text()
  return content
}

const getMockCompletionEvents: () => Promise<
  EventStream<ChatCompletions>
> = async () => {
  const mockStream = new ReadableStream<ChatCompletions>({
    start(controller) {
      for (let i = 0; i < 10; i += 1) {
        controller.enqueue({
          id: String(i),
          created: new Date(),
          promptFilterResults: [],
          choices: [
            {
              delta: {
                content: `This is completion ${i}\n`,
                role: 'system',
                toolCalls: [],
              },
              index: 0,
              finishReason: 'completed',
              logprobs: null,
            },
          ],
        })
      }
      controller.close()
    },
  }) as EventStream<ChatCompletions>

  return mockStream
}

export const getCompletionEvents = async ({
  model,
  messages,
}: AzureOptions) => {
  const deploymentId = validModels.find((m) => m.name === model)?.deployment

  if (!deploymentId) throw new Error(`Invalid model: ${model}`)

  if (deploymentId === 'mock') return getMockCompletionEvents()

  try {
    const events = await client.streamChatCompletions(deploymentId, messages)
    return events
  } catch (error: any) {
    logger.error(error)

    return { error } as any as APIError
  }
}

export async function askLlm(allMessages: Message[]): Promise<Message> {
  const model = 'gpt-3.5-turbo'
  const content = await getCompletionEvents({ model, messages: allMessages }) // Get content directly
  const assistantMessage: Message = {
    role: 'assistant',
    content,
  }

  return assistantMessage
}

export async function askCurreAndAddToMessages(
  message: Message,
  messages: Message[]
): Promise<Message> {
  messages.push(message)
  const curreResponse = await askLlm(messages)
  messages.push(curreResponse)
  return curreResponse
}
export async function askCurre(allMessages: Message[]): Promise<Message> {
  const model = 'gpt-3.5-turbo'
  const content = await getCompletion(allMessages, model) // Get content directly
  const assistantMessage: Message = {
    role: 'assistant',
    content,
  }

  return assistantMessage
}

export function createUserMessage(input: string, promptId: number): Message {
  const enhancementPrompt: string = getPromptById(promptId)
  const fullPrompt: string = `${enhancementPrompt} ${input}`

  const message: Message = {
    role: 'user',
    content: fullPrompt,
  }

  return message
}

export async function eventStreamToText(
  events: EventStream<ChatCompletions>
): Promise<string> {
  let text = ''

  for await (const event of events) {
    for (const choice of event.choices) {
      const delta = choice.delta?.content
      if (delta !== undefined) {
        text += delta
      }
    }
  }

  return text
}

export function handleValidationResponse(content: string): ValidatedInput {
  try {
    const curreFeedback: InputValidation = JSON.parse(content)

    if (curreFeedback.verdict === 'Bad') {
      return {
        success: false,
        feedback: curreFeedback.feedback,
        error: false,
      }
    }
    return { success: true, feedback: '', error: false }
  } catch {
    return { success: false, feedback: content, error: true }
  }
}

export default getCompletion
