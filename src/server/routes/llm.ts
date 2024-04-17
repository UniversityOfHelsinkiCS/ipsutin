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

async function askCurre(allMessages: Message[]): Promise<string> {
  const model = 'gpt-3.5-turbo'
  const { stream } = await getCompletionStream(allMessages, model)
  const content = await readStream(stream)

  return content
}

async function askForRefinement(
  messages: Message[],
  refinementContent: string,
  promptId: number
): Promise<string> {
  const refinementPrompt: string = getPromptById(promptId)
  const fullPrompt: string = `${refinementPrompt} ${refinementContent}`
  const userMessage: Message = {
    role: 'user',
    content: fullPrompt,
  }

  const allMessages: Message[] = messages.concat(userMessage)
  const response: string = await askCurre(allMessages)

  return response
}

llmRouter.post('/step1', async (req, res) => {
  const { inventiveMessage, industrialMessage, publicMessage } = req.body

  const emptyMessages: Message[] = []

  const content: string = await askForRefinement(
    emptyMessages,
    `The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicMessage} *** Industry relevance: ${industrialMessage}`,
    1
  )
  res.json({ content })
})

llmRouter.post('/step4', async (req, res) => {
  const { ideaRefinement, industrialRefinement, claims } = req.body

  const messages: Message[] = []

  // Step 2: Ask for idea refinement
  const ideaRefinementResponse = await askForRefinement(
    messages,
    ideaRefinement,
    2
  )

  // Step 3: Ask for claims refinement
  const claimsRefinementResponse = await askForRefinement(
    messages.concat({
      role: 'assistant',
      content: ideaRefinementResponse,
    }),
    `${industrialRefinement} Claims: ${claims}`,
    3
  )

  // Step 4: Final prompt
  const finalResponse = await askForRefinement(
    messages.concat({
      role: 'assistant',
      content: claimsRefinementResponse,
    }),
    `${ideaRefinement} Industry applicability: ${industrialRefinement} Claims: ${claimsRefinementResponse}`,
    4
  )

  res.json({ ideaRefinementResponse, claimsRefinementResponse, finalResponse })
})

export default llmRouter
