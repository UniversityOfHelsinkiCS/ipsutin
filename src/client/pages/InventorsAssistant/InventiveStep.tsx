import React, { useState } from 'react'
import {
  Box,
  Button,
  List,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmInputFeedback from './LlmInputFeedback'

type InventiveStepProps = {
  inventiveMessage: string
  setInventiveMessage: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: () => void
  aiInputFeedback: string
  aiInputFeedbackSuccess: boolean
}

const InventiveStep: React.FC<InventiveStepProps> = ({
  inventiveMessage,
  setInventiveMessage,
  handleStepCheck,
  aiInputFeedback,
  aiInputFeedbackSuccess,
}) => {
  const [inputStep, setInputStep] = useState<number>(0)
  const [buttonText, setButtonText] = useState('Next step')

  return (
    <Box component='section' sx={{ mt: 4 }}>
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

      <TextField
        fullWidth
        multiline
        minRows={5}
        value={inventiveMessage}
        onChange={(e) => setInventiveMessage(e.target.value)}
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

export default InventiveStep
