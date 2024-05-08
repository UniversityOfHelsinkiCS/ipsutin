import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { t } from 'i18next'

import LlmInputFeedback from './LlmInputFeedback'

type UserInputProps = {
  inventiveMessage: string
  setInventiveMessage: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: () => void
  aiInputFeedback: string
  aiInputFeedbackSuccess: boolean
}

const UserInput: React.FC<UserInputProps> = ({
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

export default UserInput
