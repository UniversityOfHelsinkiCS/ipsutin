import express from 'express'

import {
  askLlmNoStream,
  askLlmStream,
  createUserMessage,
  handleValidationResponse,
  streamCompletion,
} from '../services/llm'
import { Message } from '../types'

const llmRouter = express.Router()

llmRouter.post('/step1check1', async (req, res) => {
  const { inventiveMessage } = req.body
  const messages: Message[] = []

  const userMessage = createUserMessage(inventiveMessage, 0)

  messages.push(userMessage)
  const llmResponse = await askLlmNoStream(messages, true)
  messages.push(userMessage)

  const { content } = llmResponse

  const inputFeedback = handleValidationResponse(content)

  return res.json({ content: inputFeedback })
})

llmRouter.post('/step1check2', async (req, res) => {
  const { publicityMessage } = req.body
  const messages: Message[] = []

  const userMessage = createUserMessage(publicityMessage, 1)

  messages.push(userMessage)
  const llmResponse = await askLlmNoStream(messages, true)
  messages.push(userMessage)

  const { content } = llmResponse

  const inputFeedback = handleValidationResponse(content)

  return res.json({ content: inputFeedback })
})

llmRouter.post('/step1check3', async (req, res) => {
  const { industrialMessage } = req.body
  const messages: Message[] = []

  const userMessage = createUserMessage(industrialMessage, 2)

  messages.push(userMessage)
  const llmResponse = await askLlmNoStream(messages, true)
  messages.push(userMessage)

  const { content } = llmResponse

  const inputFeedback = handleValidationResponse(content)

  return res.json({ content: inputFeedback })
})
llmRouter.post('/step1', async (req, res) => {
  const { inventiveMessage, industrialMessage, publicMessage } = req.body

  const messages = []

  const userMessage = createUserMessage(
    `The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicMessage} *** Industry relevance: ${industrialMessage}`,
    3
  )

  messages.push(userMessage)

  try {
    const events = await askLlmStream(messages)

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Stream completion
    await streamCompletion(events, res)

    res.end()
    // The response will be ended by streamCompletion
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

llmRouter.post('/step2', async (req, res) => {
  const { aiResponse1, messages } = req.body

  const userMessage = createUserMessage(aiResponse1, 4)

  messages.push(userMessage)
  const events = await askLlmStream(messages)

  res.setHeader('content-type', 'text/event-stream')

  await streamCompletion(events, res)

  res.end()
})

llmRouter.post('/step3', async (req, res) => {
  const { aiResponse1, aiResponse2, messages } = req.body

  // Step 3: Ask for claims refinement
  const userMessage = createUserMessage(
    `${aiResponse1} Industrial applicability: ${aiResponse2}`,
    5
  )
  messages.push(userMessage)
  const events = await askLlmStream(messages)

  res.setHeader('content-type', 'text/event-stream')

  await streamCompletion(events, res)

  res.end()
})

llmRouter.post('/step4', async (req, res) => {
  const { aiResponse1, aiResponse2, aiResponse3, messages } = req.body

  const finalPrompt = `${aiResponse1} \nINDUSTRY APPLICABILITY: ${aiResponse2} \nCLAIMS: ${aiResponse3}`
  const userMessage = createUserMessage(finalPrompt, 6)

  messages.push(userMessage)
  const events = await askLlmStream(messages)

  res.setHeader('content-type', 'text/event-stream')

  await streamCompletion(events, res)

  res.end()
})

export default llmRouter
