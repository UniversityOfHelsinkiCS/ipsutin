import React, { useState } from 'react'
import { Alert, Box, List, ListItemText, Typography } from '@mui/material'
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
  const [aiInputFeedback1, setAiInputFeedback1] = useState('')
  const [aiInputFeedbackSuccess1, setAiInputFeedbackSuccess1] =
    useState<AiInputFeedback>('info')

  const [aiElaboration1, setAiElaboration1] = useState('')

  const [aiInputFeedback2, setAiInputFeedback2] = useState('')
  const [aiInputFeedbackSuccess2, setAiInputFeedbackSuccess2] =
    useState<AiInputFeedback>('info')

  const [aiElaboration2, setAiElaboration2] = useState('')

  const [aiInputFeedback3, setAiInputFeedback3] = useState('')
  const [aiInputFeedbackSuccess3, setAiInputFeedbackSuccess3] =
    useState<AiInputFeedback>('info')

  const [aiElaboration3, setAiElaboration3] = useState('')

  const handleFirstCheck = async () => {
    setCurrentStep(2)
    setAiInputFeedbackSuccess1('info')
    const response = await apiClient.post('/llm/step1check1', {
      inventiveMessage,
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
  }

  const handleSecondCheck = async () => {
    setCurrentStep(3)
    setAiInputFeedbackSuccess2('info')
    const response = await apiClient.post('/llm/step1check2', {
      publicityMessage,
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
  }

  const handleThirdCheck = async () => {
    setAiInputFeedbackSuccess3('info')
    const response = await apiClient.post('/llm/step1check3', {
      industrialMessage,
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
        inventiveMessage={inventiveMessage}
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
            inventiveMessage={publicityMessage}
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
            inventiveMessage={industrialMessage}
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
