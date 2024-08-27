import { Box, Button, TextField } from '@mui/material'
import { t } from 'i18next'

import useSessionStorage from '../../hooks/useSessionStorage'

import ErrorAlert from './ErrorAlert'
import LlmInputFeedback from './LlmInputFeedback'

type UserInputProps = {
  errorMessage: string | null
  userInputId: number
  userInputMessage: string
  setUserInput: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: (aiExample?: string) => void
  aiInputFeedback: string
  aiInputFeedbackSuccess: 'info' | 'success' | 'warning'
  aiElaboration: string
}

const UserInput: React.FC<UserInputProps> = ({
  errorMessage,
  userInputId,
  userInputMessage,
  setUserInput,
  handleStepCheck,
  aiInputFeedback,
  aiInputFeedbackSuccess,
  aiElaboration,
}) => {
  const [inputStep, setInputStep] = useSessionStorage<boolean>(
    `inputStep${userInputId}`,
    false
  )
  const [buttonText, setButtonText] = useSessionStorage<string>(
    `buttonText${userInputId}`,
    t('inventorsAssistant:NextStep')
  )

  // Check if the userInput is empty
  const isInputEmpty = !userInputMessage.trim()
  const isTextFieldDisabled = inputStep && aiInputFeedbackSuccess === 'success'

  return (
    <Box component='section' sx={{ mt: 4 }}>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={userInputMessage}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
        disabled={isTextFieldDisabled}
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
            setButtonText(t('inventorsAssistant:SubmitAgain'))
          }}
          // Disable the button if the input is empty
          disabled={isInputEmpty}
        >
          {buttonText}
        </Button>
      )}
      {inputStep && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {errorMessage ? (
            <ErrorAlert
              error={errorMessage}
              handleTryAgain={() => handleStepCheck(userInputMessage)}
            />
          ) : (
            <LlmInputFeedback
              aiInputFeedback={aiInputFeedback}
              alertSeverity={aiInputFeedbackSuccess}
              aiElaboration={aiElaboration}
              setUserInput={setUserInput}
              handleStepCheck={handleStepCheck}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default UserInput
