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
  const [aiInputFeedback1Success, setAiInputFeedback1Success] = useState(false)

  const [aiInputFeedback2, setAiInputFeedback2] = useState('')
  const [aiInputFeedback2Success, setAiInputFeedback2Success] = useState(false)

  const [aiInputFeedback3, setAiInputFeedback3] = useState('')
  const [aiInputFeedback3Success, setAiInputFeedback3Success] = useState(false)

  const handleFirstCheck = async () => {
    setCurrentStep(2)
    const response = await apiClient.post('/llm/step1check1', {
      inventiveMessage,
    })

    const { content } = response.data

    if (content.failed) {
      setAiInputFeedback1(content.content)
    } else if (content.success === false) {
      setAiInputFeedback1(content.feedback)
    } else {
      setAiInputFeedback1('Your input gave adequate information!')
      setAiInputFeedback1Success(true)
    }
  }

  const handleSecondCheck = async () => {
    setCurrentStep(3)
    const response = await apiClient.post('/llm/step1check2', {
      publicityMessage,
    })

    const { content } = response.data

    if (content.failed) {
      setAiInputFeedback2(content.content)
    } else if (content.success === false) {
      setAiInputFeedback2(content.feedback)
    } else {
      setAiInputFeedback2('Your input gave adequate information!')
      setAiInputFeedback2Success(true)
    }
  }

  const handleThirdCheck = async () => {
    setCurrentStep(4)
    const response = await apiClient.post('/llm/step1check3', {
      industrialMessage,
    })

    const { content } = response.data

    if (content.failed) {
      setAiInputFeedback3(content.content)
    } else if (content.success === false) {
      setAiInputFeedback3(content.feedback)
    } else {
      setAiInputFeedback3('Your input gave adequate information!')
      setAiInputFeedback3Success(true)
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
        aiInputFeedbackSuccess={aiInputFeedback1Success}
      />
      {currentStep >= 2 && aiInputFeedback1Success && (
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
            aiInputFeedbackSuccess={aiInputFeedback2Success}
          />
        </>
      )}

      {currentStep >= 3 && aiInputFeedback2Success && (
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
            aiInputFeedbackSuccess={aiInputFeedback3Success}
          />
        </>
      )}
    </Box>
  )
}

export default FirstStep
