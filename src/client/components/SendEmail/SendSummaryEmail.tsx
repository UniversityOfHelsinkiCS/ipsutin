import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Box, Button } from '@mui/material'

import styles from '../../styles'

const SendSummaryEmail = () => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)

  const { common, formStyles } = styles

  const onSubmit = async () => {
    console.log('submitted')
    setIsSent(true)
  }

  return (
    <Box>
      {!isSent ? (
        <Button
          data-cy="summary-email-button"
          sx={formStyles.stackButton}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {t('results:sendSummaryMail')}
        </Button>
      ) : (
        <Alert
          data-cy="summary-email-success-alert"
          sx={common.alertStyle}
          severity="success"
        >
          {t('results:sendSuccess')}
        </Alert>
      )}
    </Box>
  )
}

export default SendSummaryEmail
