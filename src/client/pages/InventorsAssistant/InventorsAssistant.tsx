import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'
import { Message } from '../../types'
import getCompletionStream, {
  FirstStepMessageSend,
} from '../../util/completionStream'

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

  const [inventiveMessage, setInventiveMessage] = useState('')
  const [publicMessage, setPublicMessage] = useState('')
  const [industrialMessage, setIndustrialMessage] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [secondRefinementMessage, setSecondRefinementMessage] = useState('')
  const [thirdRefinementMessage, setThirdRefinementMessage] = useState('')

  const handleFirstStepMessage = async () => {
    const model = 'gpt-3.5-turbo'
    setAiResponse('')
    try {
      const { stream } = await FirstStepMessageSend(
        inventiveMessage,
        industrialMessage,
        publicMessage,
        model
      )

      const reader = stream.getReader()

      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await reader.read()

        if (done) break

        const text = new TextDecoder().decode(value)

        setAiResponse((prev) => prev + text)
        console.log(aiResponse)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSecondStepMessage = async () => {
    const model = 'gpt-3.5-turbo'
    setAiResponse('')
    try {
      const { stream } = await FirstStepMessageSend(
        inventiveMessage,
        industrialMessage,
        publicMessage,
        model
      )

      const reader = stream.getReader()

      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await reader.read()

        if (done) break

        const text = new TextDecoder().decode(value)

        setAiResponse((prev) => prev + text)
        console.log(aiResponse)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChat = async () => {
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
    } catch (error) {
      console.error('Error:', error)
    }
    setCompletion('')
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
            refinementMessage={secondRefinementMessage}
            setRefinementMessage={setSecondRefinementMessage}
            aiResponse={aiResponse}
          />

          <Button
            onClick={() => {
              handleSecondStepMessage()
            }}
          >
            Next Step: 3
          </Button>

          <ThirdStep
            refinementMessage={thirdRefinementMessage}
            setRefinementMessage={setThirdRefinementMessage}
          />

          <Button
            onClick={() => {
              handleFirstStepMessage()
            }}
          >
            Next Step: 4
          </Button>

          <FourthStep
            refinementMessage={thirdRefinementMessage}
            setRefinementMessage={setThirdRefinementMessage}
          />
          <Button
            onClick={() => {
              handleFirstStepMessage()
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
                  handleChat()
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
