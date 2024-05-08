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
  let message = aiInputFeedback || 'Checking the quality of your input...'

  if (alertSeverity === 'info') {
    message = 'Checking the quality of your input...'
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
