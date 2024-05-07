import { Alert, Box } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

type LlmInputFeedbackProps = {
  aiInputFeedback: string
  success: boolean
}

const LlmInputFeedback = ({
  aiInputFeedback,
  success,
}: LlmInputFeedbackProps) => {
  let alertSeverity: 'info' | 'success' | 'warning' = 'info'
  let message = 'Checking the quality of your input...'

  if (aiInputFeedback) {
    if (success === true) {
      alertSeverity = 'success'
    } else if (success === false) {
      alertSeverity = 'warning'
    }
    message = aiInputFeedback
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Alert severity={alertSeverity} sx={{ my: 4, p: 4, width: '100%' }}>
        <Markdown>{message}</Markdown>
      </Alert>
    </Box>
  )
}

export default LlmInputFeedback
