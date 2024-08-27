import React, { useState } from 'react'
import { Alert, Box, Button, Typography } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'

interface ErrorAlertProps {
  error: string
  handleTryAgain: () => void
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, handleTryAgain }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Box sx={{ mt: 4 }}>
      <Alert severity='warning' sx={{ my: 4, p: 4, width: '100%' }}>
        <Markdown>{t('inventorsAssitant:ErrorAlert')}</Markdown>

        <Typography
          variant='body2'
          onClick={() => setShowDetails(!showDetails)}
          sx={{
            cursor: 'pointer',
            color: 'text.secondary',
            mt: 2,
            mb: showDetails ? 2 : 0,
            textDecoration: showDetails ? 'underline' : 'none',
          }}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Typography>

        {showDetails && <Markdown>{error}</Markdown>}

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
          onClick={() => handleTryAgain()}
        >
          {t('inventorsAssistant:tryAgain')}
        </Button>
      </Alert>
    </Box>
  )
}

export default ErrorAlert
