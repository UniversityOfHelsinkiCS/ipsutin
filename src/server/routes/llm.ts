import express from 'express'

import { getCompletionStream } from '../services/llm'

const llmRouter = express.Router()

llmRouter.post('/chat', async (req, res) => {
  console.log('at /chat')
  try {
    const model = 'gpt-3.5-turbo'
    const { messages, newMessage } = req.body

    const { stream } = await getCompletionStream(
      messages.concat(newMessage),
      model
    )
    const reader = stream.getReader()

    let content = ''

    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await reader.read()

      if (done) break

      const text = new TextDecoder().decode(value)

      content += text
    }

    res.json({ role: 'assistant', content })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'An error occurred' })
  }
})

export default llmRouter
