import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'

import illustration from '../../assets/inventors_assistant_illustration.png'
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

  const [currentStep, setCurrentStep] = useState<number>(0)

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

    const { content } = response.data

    setaiResponse1((prev) => prev + content)
  }

  const handleLastStepMessage = async () => {
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
    const newMessage: Message = {
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
    <Box component='article'>
      <Box component='section' sx={{ position: 'relative', width: '100vw' }}>
        <img aria-hidden alt='' src={illustration} height='100%' width='100%' />
        <Typography
          component='h1'
          sx={{
            position: 'absolute',
            top: { xs: '40%', sm: '50%', lg: '60%' },
            left: '40%',
            paddingRight: { xs: '1rem', sm: '2rem', md: '4rem' },
            color: 'black',
            fontSize: {
              xs: '20pt',
              sm: '24pt',
              md: '32pt',
              lg: '40pt',
              xl: '52pt',
            },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          {t('inventorsAssistant:mainHeading')}
        </Typography>
      </Box>

      <Box
        component='section'
        sx={{ maxWidth: '1024px', mx: 'auto', my: 8, p: { xs: 2, md: 0 } }}
      >
        <SectionHeading level='h2'>
          {t('inventorsAssistant:mainSubHeading')}
        </SectionHeading>
        <Typography component='p' variant='body1'>
          {t('inventorsAssistant:mainContent')}
        </Typography>

        {currentStep === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{
                mx: 'auto',
                px: 12,
                my: 4,
                borderRadius: '1rem',
                textTransform: 'capitalize',
                fontWeight: '600',
                fontSize: '12pt',
              }}
              type='button'
              variant='contained'
              color='secondary'
              onClick={() => setCurrentStep(1)}
            >
              Start
            </Button>
          </Box>
        )}
      </Box>

      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px' }}>
        {currentStep > 0 && (
          <>
            <FirstStep
              inventiveMessage={inventiveMessage}
              setInventiveMessage={setInventiveMessage}
              publicityMessage={publicMessage}
              setPublicityMessage={setPublicMessage}
              industrialMessage={industrialMessage}
              setIndustrialMessage={setIndustrialMessage}
            />
            {currentStep === 1 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  sx={{
                    mx: 'auto',
                    px: 12,
                    my: 4,
                    borderRadius: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: '600',
                    fontSize: '12pt',
                  }}
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    handleFirstStepMessage()
                    setCurrentStep(2)
                  }}
                >
                  Go to next step
                </Button>
              </Box>
            )}
          </>
        )}

        {currentStep > 1 && (
          <SecondStep
            refinementMessage={refinementMessage}
            setRefinementMessage={setRefinementMessage}
            aiResponse={aiResponse1}
          />
        )}

        {currentStep > 1 && aiResponse1.length > 0 && (
          <>
            <ThirdStep
              refinementMessage={thirdRefinementMessage}
              setRefinementMessage={setThirdRefinementMessage}
            />

            <FourthStep
              refinementMessage={thirdRefinementMessage}
              setRefinementMessage={setThirdRefinementMessage}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{
                  mx: 'auto',
                  px: 12,
                  my: 4,
                  borderRadius: '1rem',
                  textTransform: 'capitalize',
                  fontWeight: '600',
                  fontSize: '12pt',
                }}
                variant='contained'
                color='secondary'
                onClick={() => {
                  handleLastStepMessage()
                  setCurrentStep(4)
                }}
              >
                Go to the final step
              </Button>
            </Box>
          </>
        )}
      </Box>

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
    </Box>
  )
}

export default InventorsAssistant
