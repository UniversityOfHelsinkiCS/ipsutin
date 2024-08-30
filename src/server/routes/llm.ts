/* eslint-disable consistent-return */
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

llmRouter.post('/validation', async (req, res) => {
  try {
    const { userInput, validationStep } = req.body

    if (!userInput || validationStep === undefined) {
      return res
        .status(400)
        .json({ error: 'Missing userInput or validationStep' })
    }

    const messages: Message[] = []
    const userMessage = createUserMessage(userInput, validationStep)
    messages.push(userMessage)

    const llmResponse = await askLlmNoStream(messages, true)
    messages.push(userMessage)

    const { content } = llmResponse
    const inputFeedback = handleValidationResponse(content)

    return res.json({ content: inputFeedback })
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

llmRouter.post('/step1', async (req, res) => {
  const { inventiveMessage, industrialMessage, publicityMessage } = req.body

  if (!inventiveMessage || !industrialMessage || !publicityMessage) {
    return res.status(400).json({
      error: 'Missing inventiveMessage, industrialMessage, or publicMessage',
    })
  }

  const messages: Message[] = []

  const userMessage = createUserMessage(
    `The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicityMessage} *** Industry relevance: ${industrialMessage}`,
    3
  )

  messages.push(userMessage)

  try {
    const events = await askLlmStream(messages)

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    await streamCompletion(events, res)

    res.end()
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

llmRouter.post('/step2', async (req, res) => {
  const { aiResponse1, messages } = req.body

  if (!aiResponse1 || !messages) {
    return res.status(400).json({ error: 'Missing aiResponse1 or messages' })
  }

  const userMessage = createUserMessage(aiResponse1, 4)
  messages.push(userMessage)

  try {
    const events = await askLlmStream(messages)

    res.setHeader('Content-Type', 'text/event-stream')

    await streamCompletion(events, res)

    res.end()
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

llmRouter.post('/step3', async (req, res) => {
  const { aiResponse1, aiResponse2, messages } = req.body

  if (!aiResponse1 || !aiResponse2 || !messages) {
    return res
      .status(400)
      .json({ error: 'Missing aiResponse1, aiResponse2, or messages' })
  }

  const userMessage = createUserMessage(
    `${aiResponse1} Industrial applicability: ${aiResponse2}`,
    5
  )

  messages.push(userMessage)

  try {
    const events = await askLlmStream(messages)

    res.setHeader('Content-Type', 'text/event-stream')

    await streamCompletion(events, res)

    res.end()
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

llmRouter.post('/step4', async (req, res) => {
  const { aiResponse1, aiResponse2, aiResponse3, messages } = req.body

  if (!aiResponse1 || !aiResponse2 || !aiResponse3 || !messages) {
    return res.status(400).json({
      error: 'Missing aiResponse1, aiResponse2, aiResponse3, or messages',
    })
  }

  const finalPrompt = `${aiResponse1} \nINDUSTRY APPLICABILITY: ${aiResponse2} \nCLAIMS: ${aiResponse3}`
  const userMessage = createUserMessage(finalPrompt, 6)

  messages.push(userMessage)

  try {
    const events = await askLlmStream(messages)

    res.setHeader('Content-Type', 'text/event-stream')

    await streamCompletion(events, res)

    res.end()
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

export default llmRouter
