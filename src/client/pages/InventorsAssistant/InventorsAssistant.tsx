import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import axios from 'axios'

import SectionHeading from '../../components/Common/SectionHeading'
import { Message } from '../../types'
import apiClient from '../../util/apiClient'
import getCompletionStream from '../../util/completionStream'

import Conversation from './Conversation'
import FirstStep from './FirstStep'
import FourthStep from './FourthStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

const InventorsAssistant = () => {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [completion, setCompletion] = useState('')

  const [inventiveMessage, setInventiveMessage] = useState('Cat dog hybrid')
  const [publicMessage, setPublicMessage] = useState('No one knows')
  const [industrialMessage, setIndustrialMessage] = useState(
    'Everyone would love it!'
  )
  const [aiResponse1, setaiResponse1] = useState('')
  const [refinementMessage, setRefinementMessage] = useState('')
  const [thirdRefinementMessage, setThirdRefinementMessage] = useState('')

  const handleFirstStepMessage = async () => {
    setaiResponse1('')
    const response = await apiClient.post('/llm/step1', {
      inventiveMessage,
      industrialMessage,
      publicMessage,
      messages,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const { content } = response.data

    console.log(content)

    setaiResponse1((prev) => prev + content)
  }

  const handleLastStepMessage = async () => {
    setaiResponse1('')
    const response = await fetch('/step1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inventiveMessage,
        industrialMessage,
        publicMessage,
        messages,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const { content } = await response.json()

    setaiResponse1((prev) => prev + content)
  }

  const handleChat1 = async () => {
    const model = 'gpt-3.5-turbo'

    const newMessage: Message = {
      role: 'user',
      content: message,
    }

    setMessages((prev: any) => [...prev, { role: 'user', content: message }])

    try {
      const { stream } = await getCompletionStream(
        messages.concat(newMessage),
        model
      )
      const reader = stream.getReader()

      let content = ''
      setMessage('')

      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await reader.read()

        if (done) break

        const text = new TextDecoder().decode(value)

        setCompletion((prev) => prev + text)
        content += text
      }

      setMessages((prev) => [...prev, { role: 'assistant', content }])
      setCompletion('')
    } catch (error) {
      console.error('Error:', error)
    }
    setCompletion('')
  }

  const handleChat2 = async () => {
    const newMessage = {
      role: 'user',
      content: message,
    }

    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setMessage('')
    try {
      // Make POST request using axios
      const response = await apiClient.post('/llm/chat', {
        messages: messages.concat(newMessage),
      })

      // Process response
      const content = response.data

      setMessages((prev) => [...prev, content])
      setCompletion('')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleTest = async () => {
    console.log('PRESSING TEST BUTTON')
    const response1 = await axios.get(
      'http://localhost:8001/api/ai/stream/inventor/ping1'
    )
    console.log('Response 1:', response1)
    const response2 = await apiClient.get('/llm/test')

    console.log('Response 2:', response2.data)
  }

  return (
    <Grid container>
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1260px' }}>
        <Grid
          item
          sm={12}
          sx={{ px: { xs: 2, md: 4 }, mt: 4, textAlign: 'left' }}
        >
          <FirstStep
            inventiveMessage={inventiveMessage}
            setInventiveMessage={setInventiveMessage}
            publicityMessage={publicMessage}
            setPublicityMessage={setPublicMessage}
            industrialMessage={industrialMessage}
            setIndustrialMessage={setIndustrialMessage}
          />
          <Button
            onClick={() => {
              handleFirstStepMessage()
            }}
          >
            Next step: 2
          </Button>

          <SecondStep
            refinementMessage={refinementMessage}
            setRefinementMessage={setRefinementMessage}
            aiResponse={aiResponse1}
          />

          <ThirdStep
            refinementMessage={thirdRefinementMessage}
            setRefinementMessage={setThirdRefinementMessage}
          />

          <FourthStep
            refinementMessage={thirdRefinementMessage}
            setRefinementMessage={setThirdRefinementMessage}
          />
          <Button
            onClick={() => {
              handleLastStepMessage()
            }}
          >
            Next Step: Last step
          </Button>

          <Paper
            variant='outlined'
            sx={{
              padding: '5% 10%',
              mt: 5,
            }}
          >
            <Box mb={2}>
              <SectionHeading level='h3'>
                {t('inventorsAssistant:chatBoxHeader')}
              </SectionHeading>
              <Conversation messages={messages} completion={completion} />
              <TextField
                fullWidth
                multiline
                minRows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
              />
              <Button
                onClick={() => {
                  handleChat2()
                }}
              >
                Send (current)
              </Button>
              <Button
                onClick={() => {
                  handleChat1()
                }}
              >
                Send (legacy)
              </Button>
              <Button
                onClick={() => {
                  handleTest()
                }}
              >
                Test
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </Grid>
  )
}

export default InventorsAssistant
