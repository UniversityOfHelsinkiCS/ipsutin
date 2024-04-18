import express from 'express'

import { askCurreAndAddToMessages, createUserMessage } from '../services/llm'
import { Message } from '../types'

const llmRouter = express.Router()

llmRouter.post('/step1', async (req, res) => {
  const { inventiveMessage, industrialMessage, publicMessage } = req.body

  const messages: Message[] = []

  const userMessage = createUserMessage(
    `The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicMessage} *** Industry relevance: ${industrialMessage}`,
    1
  )

  const curreResponse = await askCurreAndAddToMessages(userMessage, messages)

  const { content } = curreResponse

  return res.json({ content })
})

llmRouter.post('/step4', async (req, res) => {
  const { ideaRefinement, industrialRefinement, claims } = req.body

  const messages: Message[] = []

  // Step 2: Ask for idea refinement
  const ideaRefinementMessage = createUserMessage(ideaRefinement, 2)
  const ideaRefinementResponse = await askCurreAndAddToMessages(
    ideaRefinementMessage,
    messages
  )

  // Step 3: Ask for claims refinement
  const industrialClaimsMessage = createUserMessage(
    `${ideaRefinementResponse.content} Industrial applicability: ${industrialRefinement}`,
    3
  )

  const industrialRefinementResponse = await askCurreAndAddToMessages(
    industrialClaimsMessage,
    messages
  )
  // Step 4: Final prompt
  const finalPrompt = `${ideaRefinementResponse.content} \nINDUSTRY APPLICABILITY: ${industrialRefinementResponse.content}\nCLAIMS: ${claims}`
  const finalMessage = createUserMessage(finalPrompt, 4)

  const finalResponse = await askCurreAndAddToMessages(finalMessage, messages)

  const finalResponseMessage: string = finalResponse.content

  return res.json({ finalResponseMessage })
})

export default llmRouter
