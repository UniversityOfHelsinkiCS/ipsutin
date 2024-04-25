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

llmRouter.post('/step2', async (req, res) => {
  const { ideaRefinement } = req.body

  const messages: Message[] = []

  const ideaRefinementMessage = createUserMessage(ideaRefinement, 2)

  const ideaRefinementResponse = await askCurreAndAddToMessages(
    ideaRefinementMessage,
    messages
  )

  const { content } = ideaRefinementResponse

  return res.json({ content })
})

llmRouter.post('/step3', async (req, res) => {
  const { ideaRefinement, industrialRefinement } = req.body

  const messages: Message[] = []

  // Step 3: Ask for claims refinement
  const claimsMessage = createUserMessage(
    `${ideaRefinement} Industrial applicability: ${industrialRefinement}`,
    3
  )
  const claimsResponse = await askCurreAndAddToMessages(claimsMessage, messages)

  const { content } = claimsResponse

  return res.json({ content })
})

llmRouter.post('/step4', async (req, res) => {
  const { ideaRefinement, industrialRefinement, claims } = req.body

  const messages: Message[] = []

  // Step 4: Final prompt
  const finalPrompt = `${ideaRefinement} \nINDUSTRY APPLICABILITY: ${industrialRefinement}\nCLAIMS: ${claims}`
  const finalMessage = createUserMessage(finalPrompt, 4)

  const finalResponse = await askCurreAndAddToMessages(finalMessage, messages)

  const finalResponseMessage: string = finalResponse.content

  return res.json({ finalResponseMessage })
})

export default llmRouter
