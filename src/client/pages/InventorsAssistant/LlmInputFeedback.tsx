import { useEffect, useState } from 'react'
import { Alert, Box } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

type LlmInputFeedbackProps = {
  aiInputFeedback: string
  alertSeverity: 'info' | 'success' | 'warning'
}

const LlmInputFeedback = ({
  aiInputFeedback,
  alertSeverity,
}: LlmInputFeedbackProps) => {
  const [visible, setVisible] = useState<boolean>(true)

  let message = aiInputFeedback || 'Checking the quality of your input...'

  if (alertSeverity === 'info') {
    message = 'Checking the quality of your input...'
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
        </Alert>
      )}
    </Box>
  )
}

export default LlmInputFeedback
