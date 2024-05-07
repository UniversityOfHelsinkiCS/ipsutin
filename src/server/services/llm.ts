import { CURRE_URL } from '../../config'
import { getPromptById } from '../data/inventorPrompts'
import { InputValidation, Message, ValidatedInput } from '../types'

export const getCompletion = async (
  allMessages: Message[],
  model: string
): Promise<string> => {
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

  const content = await response.text()
  return content
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

export async function askCurreAndAddToMessages(
  message: Message,
  messages: Message[]
): Promise<Message> {
  messages.push(message)
  const curreResponse = await askCurre(messages)
  messages.push(curreResponse)
  return curreResponse
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
  let validatedInput = { success: false, feedback: content, error: true }

  try {
    const curreFeedback: InputValidation = JSON.parse(content)

    if (curreFeedback.verdict === 'Bad') {
      validatedInput = {
        success: false,
        feedback: curreFeedback.feedback,
        error: false,
      }
    } else {
      validatedInput = { success: true, feedback: '', error: false }
    }
  } catch {
    validatedInput = { success: false, feedback: content, error: true }
  }

  return validatedInput
}

export default getCompletion
