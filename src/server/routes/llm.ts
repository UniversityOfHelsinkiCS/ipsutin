import express from 'express'

import {
  askLlmAndAddToMessages,
  createUserMessage,
  eventStreamToText,
  handleValidationResponse,
} from '../services/llm'
import { Message } from '../types'

const llmRouter = express.Router()

llmRouter.post('/step1check1', async (req, res) => {
  const { inventiveMessage } = req.body
  const messages: Message[] = []

  const userMessage = createUserMessage(inventiveMessage, 0)

  const curreResponse = await askLlmAndAddToMessages(userMessage, messages)

  const { content } = curreResponse

  const streamString = await eventStreamToText(content)
  const inputFeedback = handleValidationResponse(streamString)

  return res.json({ content: inputFeedback })
})

llmRouter.post('/step1check2', async (req, res) => {
  const { publicityMessage } = req.body
  const messages: Message[] = []

  const userMessage = createUserMessage(publicityMessage, 1)

  const curreResponse = await askLlmAndAddToMessages(userMessage, messages)

  const { content } = curreResponse

  const streamString = await eventStreamToText(content)
  const inputFeedback = handleValidationResponse(streamString)

  return res.json({ content: inputFeedback })
})

llmRouter.post('/step1check3', async (req, res) => {
  const { industrialMessage } = req.body
  const messages: Message[] = []

  const userMessage = createUserMessage(industrialMessage, 2)

  const curreResponse = await askLlmAndAddToMessages(userMessage, messages)

  const { content } = curreResponse

  const streamString = await eventStreamToText(content)
  const inputFeedback = handleValidationResponse(streamString)

  return res.json({ content: inputFeedback })
})

llmRouter.post('/step1', async (req, res) => {
  const { inventiveMessage, industrialMessage, publicMessage } = req.body

  const messages: Message[] = []

  const userMessage = createUserMessage(
    `The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicMessage} *** Industry relevance: ${industrialMessage}`,
    3
  )
  const curreResponse = await askLlmAndAddToMessages(userMessage, messages)

  const content = await eventStreamToText(curreResponse.content)

  return res.json({ content })
})

llmRouter.post('/step2', async (req, res) => {
  const { aiResponse1 } = req.body

  const messages: Message[] = []

  const ideaRefinementMessage = createUserMessage(aiResponse1, 4)

  const ideaRefinementResponse = await askLlmAndAddToMessages(
    ideaRefinementMessage,
    messages
  )

  const content = await eventStreamToText(ideaRefinementResponse.content)

  return res.json({ content })
})

llmRouter.post('/step3', async (req, res) => {
  const { aiResponse1, aiResponse2 } = req.body

  const messages: Message[] = []

  // Step 3: Ask for claims refinement
  const claimsMessage = createUserMessage(
    `${aiResponse1} Industrial applicability: ${aiResponse2}`,
    5
  )
  const claimsResponse = await askLlmAndAddToMessages(claimsMessage, messages)

  const content = await eventStreamToText(claimsResponse.content)

  return res.json({ content })
})

llmRouter.post('/step4', async (req, res) => {
  const { aiResponse1, aiResponse2, aiResponse3 } = req.body

  const messages: Message[] = []

  // Step 4: Final prompt
  const finalPrompt = `${aiResponse1} \nINDUSTRY APPLICABILITY: ${aiResponse2} \nCLAIMS: ${aiResponse3}`
  const finalMessage = createUserMessage(finalPrompt, 6)

  const finalResponse = await askLlmAndAddToMessages(finalMessage, messages)

  const finalResponseMessage: string = await eventStreamToText(
    finalResponse.content
  )

  return res.json({ finalResponseMessage })
})

export default llmRouter
