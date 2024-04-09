import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'
import { Message } from '../../types'

import Conversation from './Conversation'

export const getCompletionStream = async (
  messages: Message[],
  model: string
) => {
  const body = {
    options: {
      messages: [...messages],
      model,
    },
  }

  try {
    const response = await fetch(
      'http://localhost:3001/api/ai/stream/innotin',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const stream = response.body as unknown as ReadableStream

    return { stream }
  } catch (error) {
    const message = error.response?.data || 'Something went wrong'
    throw new Error(message)
  }
}

const InventorsAssistant = () => {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [completion, setCompletion] = useState('')

  const handleClick = async () => {
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
        console.log('completion: ', completion)
        setCompletion((prev) => prev + text)
        content += text
      }

      setMessages((prev) => [...prev, { role: 'assistant', content }])
    } catch (error) {
      console.error('Error:', error)
    }
    setCompletion('')
  }

  return (
    <Grid container>
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1560px' }}>
        <Grid
          item
          sm={12}
          sx={{ px: { xs: 2, md: 4 }, mt: 4, textAlign: 'center' }}
        >
          <SectionHeading level='h2'>
            {t('inventorsAssistant:header')}
          </SectionHeading>

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
                  handleClick()
                }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </Grid>
  )
}

export default InventorsAssistant
