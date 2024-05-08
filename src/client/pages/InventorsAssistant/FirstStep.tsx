import React, { useState } from 'react'
import { Box, List, ListItemText, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'
import apiClient from '../../util/apiClient'

import FirstStepIntroText from './FirstStepIntroText'
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
  const [aiInputFeedbackSuccess1, setAiInputFeedbackSuccess1] = useState<
    'info' | 'success' | 'warning'
  >('info')

  const [aiInputFeedback2, setAiInputFeedback2] = useState('')
  const [aiInputFeedbackSuccess2, setAiInputFeedbackSuccess2] = useState<
    'info' | 'success' | 'warning'
  >('info')

  const [aiInputFeedback3, setAiInputFeedback3] = useState('')
  const [aiInputFeedbackSuccess3, setAiInputFeedbackSuccess3] = useState<
    'info' | 'success' | 'warning'
  >('info')

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
    } else {
      setAiInputFeedback1('Your input gave adequate information!')
      setAiInputFeedbackSuccess1('success')
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
    } else {
      setAiInputFeedback2('Your input gave adequate information!')
      setAiInputFeedbackSuccess2('success')
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
    } else {
      setAiInputFeedback3('Your input gave adequate information!')
      setAiInputFeedbackSuccess3('success')
      setCurrentStep(4)
    }
  }
  return (
    <Box component='section' sx={{ mt: 4 }}>
      <FirstStepIntroText />

      <SectionHeading level='h3' sx={{ mt: 2 }}>
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
        setInventiveMessage={setInventiveMessage}
        handleStepCheck={handleFirstCheck}
        aiInputFeedback={aiInputFeedback1}
        aiInputFeedbackSuccess={aiInputFeedbackSuccess1}
      />
      {currentStep >= 2 && aiInputFeedbackSuccess1 === 'success' && (
        <>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:publicityStepHeader')}
          </SectionHeading>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:publicityStepDescription')}
          </Typography>
          <UserInput
            inventiveMessage={publicityMessage}
            setInventiveMessage={setPublicityMessage}
            handleStepCheck={handleSecondCheck}
            aiInputFeedback={aiInputFeedback2}
            aiInputFeedbackSuccess={aiInputFeedbackSuccess2}
          />
        </>
      )}

      {currentStep >= 3 && aiInputFeedbackSuccess2 === 'success' && (
        <>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:industrialStepHeader')}
          </SectionHeading>
          <Typography variant='body1' sx={{ my: 2 }}>
            {t('inventorsAssistant:industrialDescription')}
          </Typography>
          <UserInput
            inventiveMessage={industrialMessage}
            setInventiveMessage={setIndustrialMessage}
            handleStepCheck={handleThirdCheck}
            aiInputFeedback={aiInputFeedback3}
            aiInputFeedbackSuccess={aiInputFeedbackSuccess3}
          />
        </>
      )}
    </Box>
  )
}

export default FirstStep
