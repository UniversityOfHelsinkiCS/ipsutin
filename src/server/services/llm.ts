/* eslint-disable no-restricted-syntax */
import {
  AzureKeyCredential,
  ChatCompletions,
  EventStream,
  OpenAIClient,
} from '@azure/openai'

import { validModels } from '../../config'
import { getPromptById } from '../data/inventorPrompts'
import {
  AzureOptions,
  InputValidation,
  Message,
  ValidatedInput,
} from '../types'
import { AZURE_API_KEY, AZURE_RESOURCE } from '../util/config'
import logger from '../util/logger'

const endpoint = `https://${AZURE_RESOURCE}.openai.azure.com/`

const client = new OpenAIClient(endpoint, new AzureKeyCredential(AZURE_API_KEY))

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

export const getStreamedCompletionEvents = async ({
  model,
  messages,
  asJson,
}: AzureOptions) => {
  const deploymentId = validModels.find((m) => m.name === model)?.deployment

  if (!deploymentId) throw new Error(`Invalid model: ${model}`)

  if (deploymentId === 'mock') return getMockCompletionEvents()

  try {
    if (asJson) {
      const events = await client.streamChatCompletions(
        deploymentId,
        messages,
        { responseFormat: { type: 'json_object' } }
      )
      return events
    }
    const events = await client.streamChatCompletions(deploymentId, messages)
    return events
  } catch (error: any) {
    logger.error(error)

    return { error } as any
  }
}
export const getCompletionEvents = async ({
  model,
  messages,
  asJson,
}: AzureOptions): Promise<ChatCompletions> => {
  const deploymentId = validModels.find((m) => m.name === model)?.deployment

  if (!deploymentId) throw new Error(`Invalid model: ${model}`)

  try {
    if (asJson) {
      const completions = await client.getChatCompletions(
        deploymentId,
        messages,
        { responseFormat: { type: 'json_object' } }
      )
      return completions
    }
    const completions = await client.getChatCompletions(deploymentId, messages)
    return completions
  } catch (error: any) {
    logger.error(error)

    return { error } as any
  }
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

export async function askLlmStream(
  allMessages: Message[],
  asJson?: boolean
): Promise<Message> {
  const model = 'gpt-4o'
  const events = await getStreamedCompletionEvents({
    model,
    messages: allMessages,
    asJson,
  })
  const content = await eventStreamToText(events)
  const assistantMessage: Message = {
    role: 'assistant',
    content,
  }

  return assistantMessage
}

export async function askLlmNoStream(
  allMessages: Message[],
  asJson?: boolean
): Promise<Message> {
  const model = 'gpt-4o'
  const completions = await getCompletionEvents({
    model,
    messages: allMessages,
    asJson,
  })
  const content = completions.choices[0].message?.content

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

export function handleValidationResponse(content: string): ValidatedInput {
  try {
    const llmFeedback: InputValidation = JSON.parse(content)

    if (llmFeedback.verdict === 'Bad') {
      return {
        success: false,
        feedback: llmFeedback.feedback,
        elaboration: llmFeedback.elaboration,
        error: false,
      }
    }
    return { success: true, feedback: '', elaboration: '', error: false }
  } catch {
    return { success: false, feedback: content, elaboration: '', error: true }
  }
}
