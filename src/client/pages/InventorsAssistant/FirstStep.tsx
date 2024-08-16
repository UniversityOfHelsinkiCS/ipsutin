import React, { useEffect, useState } from 'react'
import { Alert, Box, List, ListItemText, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'
import { AiInputFeedback } from '../../types'
import apiClient from '../../util/apiClient'

import UserInput from './UserInput'

type FirstStepProps = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  inventiveMessage: string
  setInventiveMessage: React.Dispatch<React.SetStateAction<string>>
  publicityMessage: string
  setPublicityMessage: React.Dispatch<React.SetStateAction<string>>
  industrialMessage: string
  setIndustrialMessage: React.Dispatch<React.SetStateAction<string>>
}

const FirstStep: React.FC<FirstStepProps> = ({
  currentStep,
  setCurrentStep,
  inventiveMessage,
  setInventiveMessage,
  publicityMessage,
  setPublicityMessage,
  industrialMessage,
  setIndustrialMessage,
}) => {
  const [aiInputFeedback1, setAiInputFeedback1] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiInputFeedback1')
    return saved ? JSON.parse(saved) : ''
  })
  const [aiInputFeedbackSuccess1, setAiInputFeedbackSuccess1] =
    useState<AiInputFeedback>(() => {
      const saved = sessionStorage.getItem('aiInputFeedbackSuccess1')
      return saved ? JSON.parse(saved) : 'info'
    })
  const [aiElaboration1, setAiElaboration1] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiElaboration1')
    return saved ? JSON.parse(saved) : ''
  })

  const [aiInputFeedback2, setAiInputFeedback2] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiInputFeedback2')
    return saved ? JSON.parse(saved) : ''
  })
  const [aiInputFeedbackSuccess2, setAiInputFeedbackSuccess2] =
    useState<AiInputFeedback>(() => {
      const saved = sessionStorage.getItem('aiInputFeedbackSuccess2')
      return saved ? JSON.parse(saved) : 'info'
    })
  const [aiElaboration2, setAiElaboration2] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiElaboration2')
    return saved ? JSON.parse(saved) : ''
  })

  const [aiInputFeedback3, setAiInputFeedback3] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiInputFeedback3')
    return saved ? JSON.parse(saved) : ''
  })
  const [aiInputFeedbackSuccess3, setAiInputFeedbackSuccess3] =
    useState<AiInputFeedback>(() => {
      const saved = sessionStorage.getItem('aiInputFeedbackSuccess3')
      return saved ? JSON.parse(saved) : 'info'
    })
  const [aiElaboration3, setAiElaboration3] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiElaboration3')
    return saved ? JSON.parse(saved) : ''
  })

  const [errorMessage1, setErrorMessage1] = useState<string | null>(() => {
    const saved = sessionStorage.getItem('errorMessage1')
    return saved ? JSON.parse(saved) : null
  })

  const [errorMessage2, setErrorMessage2] = useState<string | null>(() => {
    const saved = sessionStorage.getItem('errorMessage2')
    return saved ? JSON.parse(saved) : null
  })

  const [errorMessage3, setErrorMessage3] = useState<string | null>(() => {
    const saved = sessionStorage.getItem('errorMessage3')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    sessionStorage.setItem('errorMessage1', JSON.stringify(errorMessage1))
  }, [errorMessage1])

  useEffect(() => {
    sessionStorage.setItem('errorMessage2', JSON.stringify(errorMessage2))
  }, [errorMessage2])

  useEffect(() => {
    sessionStorage.setItem('errorMessage3', JSON.stringify(errorMessage3))
  }, [errorMessage3])

  useEffect(() => {
    sessionStorage.setItem('aiInputFeedback1', JSON.stringify(aiInputFeedback1))
  }, [aiInputFeedback1])

  useEffect(() => {
    sessionStorage.setItem(
      'aiInputFeedbackSuccess1',
      JSON.stringify(aiInputFeedbackSuccess1)
    )
  }, [aiInputFeedbackSuccess1])

  useEffect(() => {
    sessionStorage.setItem('aiElaboration1', JSON.stringify(aiElaboration1))
  }, [aiElaboration1])

  useEffect(() => {
    sessionStorage.setItem('aiInputFeedback2', JSON.stringify(aiInputFeedback2))
  }, [aiInputFeedback2])

  useEffect(() => {
    sessionStorage.setItem(
      'aiInputFeedbackSuccess2',
      JSON.stringify(aiInputFeedbackSuccess2)
    )
  }, [aiInputFeedbackSuccess2])

  useEffect(() => {
    sessionStorage.setItem('aiElaboration2', JSON.stringify(aiElaboration2))
  }, [aiElaboration2])

  useEffect(() => {
    sessionStorage.setItem('aiInputFeedback3', JSON.stringify(aiInputFeedback3))
  }, [aiInputFeedback3])

  useEffect(() => {
    sessionStorage.setItem(
      'aiInputFeedbackSuccess3',
      JSON.stringify(aiInputFeedbackSuccess3)
    )
  }, [aiInputFeedbackSuccess3])

  useEffect(() => {
    sessionStorage.setItem('aiElaboration3', JSON.stringify(aiElaboration3))
  }, [aiElaboration3])

  const handleFirstCheck = async (aiExample?: string) => {
    try {
      setErrorMessage1(null)
      setCurrentStep(2)
      setAiInputFeedbackSuccess1('info')
      const message = aiExample || inventiveMessage
      const response = await apiClient.post('/llm/step1check1', {
        inventiveMessage: message,
      })

      const { content } = response.data

      if (content.failed) {
        setAiInputFeedbackSuccess1('warning')
        setAiInputFeedback1(content.content)
      } else if (content.success === false) {
        setAiInputFeedbackSuccess1('warning')
        setAiInputFeedback1(content.feedback)
        setAiElaboration1(content.elaboration)
      } else {
        setAiInputFeedback1('Your input gave adequate information!')
        setAiInputFeedbackSuccess1('success')
        setAiElaboration1('')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage1(
            `Server Error: ${error.response.status} - ${error.response.data.message || 'An unexpected error occurred'}`
          )
        } else if (error.request) {
          setErrorMessage1('Network Error: Unable to reach the server')
        } else {
          setErrorMessage1(`Request Error: ${error.message}`)
        }
      } else if (error instanceof Error) {
        setErrorMessage2(`Error: ${error.message}`)
      } else {
        setErrorMessage2('An unknown error occurred')
      }
    }
  }

  const handleSecondCheck = async (aiExample?: string) => {
    try {
      setErrorMessage2(null)
      setCurrentStep(3)
      setAiInputFeedbackSuccess2('info')
      const message = aiExample || publicityMessage
      const response = await apiClient.post('/llm/step1check2', {
        publicityMessage: message,
      })

      const { content } = response.data

      if (content.failed) {
        setAiInputFeedbackSuccess2('warning')
        setAiInputFeedback2(content.content)
      } else if (content.success === false) {
        setAiInputFeedbackSuccess2('warning')
        setAiInputFeedback2(content.feedback)
        setAiElaboration2(content.elaboration)
      } else {
        setAiInputFeedback2('Your input gave adequate information!')
        setAiInputFeedbackSuccess2('success')
        setAiElaboration2('')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage2(
            `Server Error: ${error.response.status} - ${error.response.data.message || 'An unexpected error occurred'}`
          )
        } else if (error.request) {
          setErrorMessage2('Network Error: Unable to reach the server')
        } else {
          setErrorMessage2(`Request Error: ${error.message}`)
        }
      } else if (error instanceof Error) {
        setErrorMessage2(`Error: ${error.message}`)
      } else {
        setErrorMessage2('An unknown error occurred')
      }
    }
  }

  const handleThirdCheck = async (aiExample?: string) => {
    try {
      setErrorMessage3(null)
      setAiInputFeedbackSuccess3('info')
      const message = aiExample || industrialMessage
      const response = await apiClient.post('/llm/step1check3', {
        industrialMessage: message,
      })

      const { content } = response.data

      if (content.failed) {
        setAiInputFeedbackSuccess3('warning')
        setAiInputFeedback3(content.content)
      } else if (content.success === false) {
        setAiInputFeedbackSuccess3('warning')
        setAiInputFeedback3(content.feedback)
        setAiElaboration3(content.elaboration)
      } else {
        setAiInputFeedback3('Your input gave adequate information!')
        setAiInputFeedbackSuccess3('success')
        setAiElaboration3('')
        setCurrentStep(4)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage3(
            `Server Error: ${error.response.status} - ${error.response.data.message || 'An unexpected error occurred'}`
          )
        } else if (error.request) {
          setErrorMessage3('Network Error: Unable to reach the server')
        } else {
          setErrorMessage3(`Request Error: ${error.message}`)
        }
      } else if (error instanceof Error) {
        setErrorMessage2(`Error: ${error.message}`)
      } else {
        setErrorMessage2('An unknown error occurred')
      }
    }
  }

  return (
    <Box component='section' sx={{ mt: 4 }}>
      <SectionHeading level='h2' sx={{ mt: 8 }}>
        {t('inventorsAssistant:header2')}
      </SectionHeading>
      <Typography variant='body1'>
        {t('inventorsAssistant:step1MainContent')}
      </Typography>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:step1Disclaimer')}
      </Typography>
      <Alert severity='info' sx={{ mt: 2 }}>
        {t('inventorsAssistant:h2text1')}
      </Alert>

      <SectionHeading level='h2' sx={{ mt: 2 }}>
        {t('inventorsAssistant:inventiveStepHeader')}
      </SectionHeading>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:inventiveStepDescription')}
      </Typography>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:describeGeneralIdea')}
      </Typography>

      <List sx={{ pl: 2 }}>
        <ListItemText>{t('inventorsAssistant:problem')}</ListItemText>
        <ListItemText>{t('inventorsAssistant:invention')}</ListItemText>
        <ListItemText>{t('inventorsAssistant:applications')}</ListItemText>
      </List>

      <UserInput
        errorMessage={errorMessage1}
        userInputId={1}
        userInputMessage={inventiveMessage}
        setUserInput={setInventiveMessage}
        handleStepCheck={handleFirstCheck}
        aiInputFeedback={aiInputFeedback1}
        aiInputFeedbackSuccess={aiInputFeedbackSuccess1}
        aiElaboration={aiElaboration1}
      />

      {currentStep >= 2 && aiInputFeedbackSuccess1 === 'success' && (
        <>
          <SectionHeading level='h2'>
            {t('inventorsAssistant:publicityStepHeader')}
          </SectionHeading>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:publicityStepDescription')}
          </Typography>
          <UserInput
            errorMessage={errorMessage2}
            userInputId={2}
            userInputMessage={publicityMessage}
            setUserInput={setPublicityMessage}
            handleStepCheck={handleSecondCheck}
            aiInputFeedback={aiInputFeedback2}
            aiInputFeedbackSuccess={aiInputFeedbackSuccess2}
            aiElaboration={aiElaboration2}
          />
        </>
      )}

      {currentStep >= 3 && aiInputFeedbackSuccess2 === 'success' && (
        <>
          <SectionHeading level='h2'>
            {t('inventorsAssistant:industrialStepHeader')}
          </SectionHeading>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:industrialDescription')}
          </Typography>
          <UserInput
            errorMessage={errorMessage3}
            userInputId={3}
            userInputMessage={industrialMessage}
            setUserInput={setIndustrialMessage}
            handleStepCheck={handleThirdCheck}
            aiInputFeedback={aiInputFeedback3}
            aiInputFeedbackSuccess={aiInputFeedbackSuccess3}
            aiElaboration={aiElaboration3}
          />
        </>
      )}
      {currentStep >= 4 && aiInputFeedbackSuccess3 === 'success' && (
        <>
          <SectionHeading level='h2'>
            {t('inventorsAssistant:step1ClosingHeader')}
          </SectionHeading>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:step1ClosingText')}
          </Typography>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:step1ClosingReminder')}
          </Typography>
        </>
      )}
    </Box>
  )
}

export default FirstStep
