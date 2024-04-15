import axios from 'axios'
import express from 'express'

import { getCompletionStream } from '../services/llm'
import { Message } from '../types'

const llmRouter = express.Router()

llmRouter.post('/chat', async (req, res) => {
  console.log('at /chat')
  try {
    const model = 'gpt-3.5-turbo'
    const { messages } = req.body

    console.log('messages:', messages)
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
      'http://gptwrapper_dev:8000/api/ai/stream/inventor/ping2'
    )

    console.log('response:', response)

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

  const fullPrompt = `
    You are an expert inventor employing chain of thought analysis to meticulously craft an invention report. Patent applications are scrutinized based on three pivotal criteria:
    1. Inventive Step: This criterion demands that your product or process not only solves a problem but does so through an inventive approach that is not obvious to someone with expertise in the field.
    2. Novelty: Your invention must be unique, signifying that no part of it has been previously disclosed to the public in any form, including by the inventor themselves. This requires a thorough examination of existing solutions, patents, and publicly available information to ensure that your invention stands apart. Special attention should be paid to any prior disclosures made by the inventor, assessing how such disclosures impact the invention's novelty. 
        Critically remark on already published and disclosed materials.
    3. Industrial Applicability: The invention should have practical utility in its respective industry, capable of being manufactured or used in any kind of industry.

    To construct a comprehensive invention report, proceed through the following enhanced steps:
    
    Step 1: Contextual Understanding
      Begin by analyzing the given context, focusing on the specific problem the invention aims to solve within its industry.
    
    Step 2: Critical Evaluation of Novelty including public dissemination by the inventor
      Conduct a detailed evaluation of the novelty aspect by identifying any existing solutions, patents, or public disclosures that resemble the invention. This includes a critical examination of any disclosures made by the inventor that could potentially jeopardize the invention's novelty.
      Consider the following:
      a. What distinguishes the invention from existing solutions, including any previous versions or disclosures by the inventor?
      b. How does it improve upon or deviate from these solutions in a way that was not previously public knowledge, taking into account any inventor's own prior disclosures?
      c. Provide examples of prior art (if any) and critically evaluate how the invention differs significantly, especially in light of any self-disclosure by the inventor.
    
    Step 3: Inventive Step and Industrial Applicability Analysis
      Examine the inventive step by explaining the unique approach or solution the invention proposes. Detail how this approach is non-obvious to experts in the field.
      Assess the industrial applicability by demonstrating how the invention can be utilized or manufactured, including its practical benefits to the industry.
    
    Step 4: Crystallization of the Invention
      Finally, synthesize your findings into a coherent invention report. This should include a clear statement of the invention following the idea topic, its background, relevance to the industry, and its unique contributions to the field.
    
    The idea is: ${inventiveMessage} *** Novelty for critical analysis: ${publicMessage} *** Industry relevance: ${industrialMessage}
  `
  const newMessage: Message = {
    role: 'user',
    content: fullPrompt,
  }
  console.log('Messages:', messages)

  const allMessages = messages.concat(newMessage)

  console.log('allMessages:', allMessages)

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
