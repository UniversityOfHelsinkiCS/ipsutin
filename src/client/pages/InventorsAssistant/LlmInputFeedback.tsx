import { useEffect, useState } from 'react'
import { Alert, Box } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

type LlmInputFeedbackProps = {
  aiInputFeedback: string
  alertSeverity: 'info' | 'success' | 'warning'
  aiElaboration: string
}

const LlmInputFeedback = ({
  aiInputFeedback,
  alertSeverity,
  aiElaboration,
}: LlmInputFeedbackProps) => {
  const [visible, setVisible] = useState<boolean>(true)

  let message = 'Checking the quality of your input...'

  if (alertSeverity === 'success') {
    message = aiInputFeedback
  }

  if (alertSeverity === 'warning' && aiElaboration !== '') {
    message = `${aiInputFeedback}

    **For example:**
    ${aiElaboration}
    
    **Remember:**
    I am an AI assistant and the above is only an example, and might overlook important aspects.`
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
