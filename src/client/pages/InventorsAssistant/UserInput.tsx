import { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { t } from 'i18next'

import LlmInputFeedback from './LlmInputFeedback'

type UserInputProps = {
  userInputId: number
  inventiveMessage: string
  setUserInput: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: (aiExample?: string) => void
  aiInputFeedback: string
  aiInputFeedbackSuccess: 'info' | 'success' | 'warning'
  aiElaboration: string
}

const UserInput: React.FC<UserInputProps> = ({
  userInputId,
  inventiveMessage,
  setUserInput,
  handleStepCheck,
  aiInputFeedback,
  aiInputFeedbackSuccess,
  aiElaboration,
}) => {
  const [inputStep, setInputStep] = useState<boolean>(() => {
    const saved = sessionStorage.getItem(`inputStep${userInputId}`)
    return saved ? JSON.parse(saved) : false
  })

  const [buttonText, setButtonText] = useState<string>(() => {
    const saved = sessionStorage.getItem(`buttonText${userInputId}`)
    return saved ? JSON.parse(saved) : 'Next step'
  })

  useEffect(() => {
    sessionStorage.setItem(`inputStep${userInputId}`, JSON.stringify(inputStep))
  }, [inputStep, userInputId])

  useEffect(() => {
    sessionStorage.setItem(
      `buttonText${userInputId}`,
      JSON.stringify(buttonText)
    )
  }, [buttonText, userInputId])

  useEffect(() => {
    sessionStorage.setItem(
      `aiInputFeedbackSuccess${userInputId}`,
      JSON.stringify(aiInputFeedbackSuccess)
    )
  }, [aiInputFeedbackSuccess, userInputId])

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
          setUserInput={setUserInput}
          handleStepCheck={handleStepCheck}
        />
      )}
    </Box>
  )
}

export default UserInput
