import React from 'react'
import { Alert, Box, List, ListItemText, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'
import useSessionStorage from '../../hooks/useSessionStorage'
import { FeedbackState } from '../../types'
import apiClient from '../../util/apiClient'

import UserInput from './UserInput'

const initialFeedbackState: FeedbackState = {
  aiInputFeedback: '',
  aiInputFeedbackSuccess: 'info',
  errorMessage: null,
  aiElaboration: '',
}

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
  const [feedback1, setFeedback1] = useSessionStorage<FeedbackState>(
    'feedback1',
    initialFeedbackState
  )
  const [feedback2, setFeedback2] = useSessionStorage<FeedbackState>(
    'feedback2',
    initialFeedbackState
  )
  const [feedback3, setFeedback3] = useSessionStorage<FeedbackState>(
    'feedback3',
    initialFeedbackState
  )

  const handleValidation = async (
    step: number,
    userInput: string,
    feedbackState: React.Dispatch<React.SetStateAction<FeedbackState>>,
    validationStep: number,
    aiElaboration?: string
  ) => {
    try {
      feedbackState((prevState) => ({
        ...prevState,
        aiInputFeedbackSuccess: 'info',
      }))

      const requestBody = {
        userInput: aiElaboration || userInput,
        validationStep,
      }

      const response = await apiClient.post('llm/validation', requestBody)
      const { content } = response.data

      if (content.failed) {
        if (typeof content.content !== 'string') {
          feedbackState((prevState) => ({
            ...prevState,
            aiInputFeedbackSuccess: 'warning',
            aiInputFeedback: 'An Error Occurred. Try submitting again',
          }))
        }
      } else if (content.success === false) {
        feedbackState((prevState) => ({
          ...prevState,
          aiInputFeedbackSuccess: 'warning',
          aiInputFeedback: content.feedback,
          aiElaboration: content.elaboration,
        }))
      } else {
        feedbackState((prevState) => ({
          ...prevState,
          aiInputFeedbackSuccess: 'success',
          aiInputFeedback: 'Your input gave adequate information!',
        }))
        setCurrentStep(step)
      }
    } catch (error) {
      let errorMessage: string

      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = `Server Error: ${error.response.status} - ${error.response.data.message || 'An unexpected error occurred'}`
        } else if (error.request) {
          errorMessage = 'Network Error: Unable to reach the server'
        } else {
          errorMessage = `Request Error: ${error.message}`
        }
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`
      } else {
        errorMessage = 'An unknown error occurred'
      }

      feedbackState((prevState) => ({
        ...prevState,
        errorMessage,
      }))
    }
  }

  const handleFirstValidation = async () => {
    await handleValidation(2, inventiveMessage, setFeedback1, 0)
  }

  const handleSecondValidation = async () => {
    await handleValidation(3, publicityMessage, setFeedback2, 1)
  }

  const handleThirdValidation = async () => {
    await handleValidation(4, industrialMessage, setFeedback3, 2)
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
        errorMessage={feedback1.errorMessage}
        userInputId={1}
        userInputMessage={inventiveMessage}
        setUserInput={setInventiveMessage}
        handleStepCheck={handleFirstValidation}
        aiInputFeedback={feedback1.aiInputFeedback}
        aiInputFeedbackSuccess={feedback1.aiInputFeedbackSuccess}
        aiElaboration={feedback1.aiElaboration}
      />

      {currentStep >= 2 && feedback1.aiInputFeedbackSuccess === 'success' && (
        <>
          <SectionHeading level='h2'>
            {t('inventorsAssistant:publicityStepHeader')}
          </SectionHeading>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:publicityStepDescription')}
          </Typography>
          <UserInput
            errorMessage={feedback2.errorMessage}
            userInputId={2}
            userInputMessage={publicityMessage}
            setUserInput={setPublicityMessage}
            handleStepCheck={handleSecondValidation}
            aiInputFeedback={feedback2.aiInputFeedback}
            aiInputFeedbackSuccess={feedback2.aiInputFeedbackSuccess}
            aiElaboration={feedback2.aiElaboration}
          />
        </>
      )}

      {currentStep >= 3 && feedback2.aiInputFeedbackSuccess === 'success' && (
        <>
          <SectionHeading level='h2'>
            {t('inventorsAssistant:industrialStepHeader')}
          </SectionHeading>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:industrialDescription')}
          </Typography>
          <UserInput
            errorMessage={feedback3.errorMessage}
            userInputId={3}
            userInputMessage={industrialMessage}
            setUserInput={setIndustrialMessage}
            handleStepCheck={handleThirdValidation}
            aiInputFeedback={feedback3.aiInputFeedback}
            aiInputFeedbackSuccess={feedback3.aiInputFeedbackSuccess}
            aiElaboration={feedback3.aiElaboration}
          />
        </>
      )}
      {currentStep >= 4 && feedback3.aiInputFeedbackSuccess === 'success' && (
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
