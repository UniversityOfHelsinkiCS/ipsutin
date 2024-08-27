import { useEffect, useState } from 'react'
import { Alert, Box, Button } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'

type LlmInputFeedbackProps = {
  aiInputFeedback: string
  alertSeverity: 'info' | 'success' | 'warning'
  aiElaboration: string
  setUserInput: React.Dispatch<React.SetStateAction<string>>
  handleStepCheck: (aiExample?: string) => void
}

const LlmInputFeedback = ({
  aiInputFeedback,
  alertSeverity,
  aiElaboration,
  setUserInput,
  handleStepCheck,
}: LlmInputFeedbackProps) => {
  const [visible, setVisible] = useState<boolean>(true)

  let message = t('inventorsAssistant:llmFeedbackInitialMessage')

  if (alertSeverity === 'success') {
    message = aiInputFeedback
  }

  if (alertSeverity === 'warning' && aiElaboration !== '') {
    message = `${aiInputFeedback}

    **For example:**
    ${aiElaboration}
    
    **Notice:**
    ${t('inventorsAssistant:Notice')}`
  }

  useEffect(() => {
    if (alertSeverity === 'success') {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 6000)
      return () => clearTimeout(timer)
    }

    return undefined
  }, [alertSeverity])

  return (
    <Box sx={{ mt: 4 }}>
      {visible && (
        <Alert severity={alertSeverity} sx={{ my: 4, p: 4, width: '100%' }}>
          <Markdown>{message}</Markdown>
          {alertSeverity === 'warning' && (
            <Button
              sx={{
                mt: 'auto',
                alignSelf: 'flex-end',
                px: 3,
                my: 3,
                borderRadius: '1rem',
                textTransform: 'capitalize',
                fontWeight: '500',
                fontSize: '11pt',
              }}
              variant='contained'
              color='secondary'
              onClick={() => {
                setUserInput(aiElaboration)
                handleStepCheck(aiElaboration)
              }}
            >
              {t('inventorsAssistant:ProceedWithAiExample')}
            </Button>
          )}
        </Alert>
      )}
    </Box>
  )
}

export default LlmInputFeedback
