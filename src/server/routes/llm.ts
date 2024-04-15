import axios from 'axios'
import express from 'express'

import { CURRE_URL } from '../../config'
import { getPromptById } from '../data/inventorPrompts'
import { getCompletionStream } from '../services/llm'
import { Message } from '../types'

const llmRouter = express.Router()

llmRouter.post('/chat', async (req, res) => {
  console.log('AT /CHAT')
  try {
    const model = 'gpt-3.5-turbo'
    const { messages } = req.body

    const { stream } = await getCompletionStream(messages, model)

    const reader = stream.getReader()

    let content = ''

    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await reader.read()

      if (done) break

      const text = new TextDecoder().decode(value)

      content += text
    }
    console.log('CONTENT: ', content)
    res.json({ role: 'assistant', content })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'An error occurred' })
  }
})

llmRouter.get('/test', async (req, res) => {
  console.log('TESTING PINGING gptWRAPPER!!!')

  try {
    const response = await axios.get(
      `${CURRE_URL}/api/ai/stream/inventor/ping2`
    )
    console.log(response)
    res.status(200).json({ message: 'Ping successful' })
  } catch (error) {
    console.log('ERROR: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

llmRouter.post('/step1', async (req, res) => {
  console.log('AT FIRST STEP IN BACKEND')

  const model = 'gpt-3.5-turbo'
  const { inventiveMessage, industrialMessage, publicMessage, messages } =
    req.body

  const prompt1 = getPromptById(1)

  const fullPrompt = `${prompt1}
    The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicMessage} *** Industry relevance: ${industrialMessage}
  `
  const newMessage: Message = {
    role: 'user',
    content: fullPrompt,
  }

  const allMessages = messages.concat(newMessage)

  const { stream } = await getCompletionStream(allMessages, model)

  const reader = stream.getReader()

  let content = ''

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read()

    if (done) break

    const text = new TextDecoder().decode(value)

    content += text
  }

  res.json({ content })
})

export default llmRouter
