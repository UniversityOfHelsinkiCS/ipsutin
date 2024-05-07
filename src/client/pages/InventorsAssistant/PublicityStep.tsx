import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmInputFeedback from './LlmInputFeedback'

type PublicityStepProps = {
  publicityMessage: string
  setPublicityMessage: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: () => void
  aiInputFeedback: string
  aiInputFeedbackSuccess: boolean
}

const PublicityStep: React.FC<PublicityStepProps> = ({
  publicityMessage,
  setPublicityMessage,
  handleStepCheck,
  aiInputFeedback,
  aiInputFeedbackSuccess,
}) => {
  const [inputStep, setInputStep] = useState<number>(0)
  const [buttonText, setButtonText] = useState('Next step')

  return (
    <Box component='section' sx={{ mt: 4 }}>
      <SectionHeading level='h3'>
        {t('inventorsAssistant:publicityStepHeader')}
      </SectionHeading>
      <Typography variant='body1' sx={{ my: 2 }}>
        {t('inventorsAssistant:publicityStepDescription')}
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={publicityMessage}
        onChange={(e) => setPublicityMessage(e.target.value)}
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

export default PublicityStep
