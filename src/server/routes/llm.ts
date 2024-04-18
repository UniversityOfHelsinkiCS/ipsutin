import express from 'express'

import { getPromptById } from '../data/inventorPrompts'
import { getCompletionStream } from '../services/llm'
import { Message } from '../types'

const llmRouter = express.Router()

async function readStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader()
  let content = ''

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read()

    if (done) break

    const text = new TextDecoder().decode(value)
    content += text
  }

  return content
}

async function askCurre(allMessages: Message[]): Promise<Message> {
  const model = 'gpt-3.5-turbo'
  const { stream } = await getCompletionStream(allMessages, model)
  const content = await readStream(stream)

  const assistantMessage: Message = {
    role: 'assistant',
    content,
  }

  return assistantMessage
}

function createUserMessage(input: string, promptId: number): Message {
  const enhancementPrompt: string = getPromptById(promptId)
  const fullPrompt: string = `${enhancementPrompt} ${input}`

  const message: Message = {
    role: 'user',
    content: fullPrompt,
  }

  return message
}

async function askCurreAndAddToMessages(
  message: Message,
  messages: Message[]
): Promise<Message> {
  messages.push(message)
  const curreResponse = await askCurre(messages)
  messages.push(curreResponse)
  return curreResponse
}

llmRouter.post('/step1', async (req, res) => {
  const { inventiveMessage, industrialMessage, publicMessage } = req.body

  const messages: Message[] = []

  const userMessage = createUserMessage(
    `The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicMessage} *** Industry relevance: ${industrialMessage}`,
    1
  )

  const curreResponse = await askCurreAndAddToMessages(userMessage, messages)

  const { content } = curreResponse

  res.json({ content })
})

llmRouter.post('/step4', async (req, res) => {
  const { ideaRefinement, industrialRefinement, claims } = req.body

  const messages: Message[] = []

  // Step 1: Ask for idea refinement
  const ideaRefinementMessage = createUserMessage(ideaRefinement, 2)
  const ideaRefinementResponse = await askCurreAndAddToMessages(
    ideaRefinementMessage,
    messages
  )

  // Step 2: Ask for claims refinement
  const industrialClaimsMessage = createUserMessage(
    `${industrialRefinement} Claims: ${claims}`,
    3
  )
  const claimsRefinementResponse = await askCurreAndAddToMessages(
    industrialClaimsMessage,
    messages
  )
  // Step 3: Final prompt
  const finalPrompt = `${ideaRefinementResponse.content} Industry applicability: ${industrialRefinement.content} Claims: ${claimsRefinementResponse.content}`
  const finalMessage = createUserMessage(finalPrompt, 4)
  const finalResponse = await askCurreAndAddToMessages(finalMessage, messages)

  const finalResponseMessage: string = finalResponse.content

  res.json({ finalResponseMessage })
})

export default llmRouter
