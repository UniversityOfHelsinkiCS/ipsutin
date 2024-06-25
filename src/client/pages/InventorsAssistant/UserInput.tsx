import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { t } from 'i18next'

import LlmInputFeedback from './LlmInputFeedback'

type UserInputProps = {
  inventiveMessage: string
  setUserInput: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: () => void
  aiInputFeedback: string
  aiInputFeedbackSuccess: 'info' | 'success' | 'warning'
  aiElaboration: string
}

const UserInput: React.FC<UserInputProps> = ({
  inventiveMessage,
  setUserInput,
  handleStepCheck,
  aiInputFeedback,
  aiInputFeedbackSuccess,
  aiElaboration,
}) => {
  const [inputStep, setInputStep] = useState(false)
  const [buttonText, setButtonText] = useState('Next step')

  return (
    <Box component='section' sx={{ mt: 4 }}>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={inventiveMessage}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />

      {(!inputStep || (inputStep && aiInputFeedbackSuccess === 'warning')) && (
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
            setInputStep(true)
            setButtonText('Submit again')
          }}
        >
          {buttonText}
        </Button>
      )}

      {inputStep && (
        <LlmInputFeedback
          aiInputFeedback={aiInputFeedback}
          alertSeverity={aiInputFeedbackSuccess}
          aiElaboration={aiElaboration}
        />
      )}
    </Box>
  )
}

export default UserInput
