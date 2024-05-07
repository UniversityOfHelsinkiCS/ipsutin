import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmInputFeedback from './LlmInputFeedback'

type IndustrialStepProps = {
  industrialMessage: string
  setIndustrialMessage: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: () => void
  aiInputFeedback: string
  aiInputFeedbackSuccess: boolean
}

const IndustrialStep: React.FC<IndustrialStepProps> = ({
  industrialMessage,
  setIndustrialMessage,
  handleStepCheck,
  aiInputFeedback,
  aiInputFeedbackSuccess,
}) => {
  const [inputStep, setInputStep] = useState<number>(0)
  const [buttonText, setButtonText] = useState('Next step')

  return (
    <Box component='section' sx={{ mt: 4 }}>
      <SectionHeading level='h3'>
        {t('inventorsAssistant:industrialStepHeader')}
      </SectionHeading>
      <Typography variant='body1' sx={{ my: 2 }}>
        {t('inventorsAssistant:industrialDescription')}
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={industrialMessage}
        onChange={(e) => setIndustrialMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />

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
          handleStepCheck()
          setInputStep(1)
          setButtonText('Submit again')
        }}
      >
        {buttonText}
      </Button>

      {inputStep > 0 && (
        <LlmInputFeedback
          aiInputFeedback={aiInputFeedback}
          success={aiInputFeedbackSuccess}
        />
      )}
    </Box>
  )
}

export default IndustrialStep
