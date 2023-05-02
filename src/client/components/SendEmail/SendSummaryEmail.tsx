import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Box, Button } from '@mui/material'

import styles from '../../styles'
import apiClient from '../../util/apiClient'
import { InputProps } from '../../types'

const SendSummaryEmail = ({ handleSubmit, answers }: InputProps) => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)

  const { common, formStyles } = styles

  const ticketEmail = ''

  const sendResultsToEmail = async (targets: string[], text: string) => {
    apiClient.post('/summary', {
      targets,
      text,
      subject: 'Ipsutin summary',
    })
  }

  const sendResults = async () => {
    const targets = [ticketEmail]
    const text = `

    Summary of the Licences survey
    ============================

    ${JSON.stringify(answers)}

    `

    if (!isSent) {
      try {
        await sendResultsToEmail(targets, text)
        setIsSent(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (Object.keys(answers).length !== 0) {
      sendResults()
    }
  }, [answers])

  const submitFormData = (event: BaseSyntheticEvent) => {
    handleSubmit(event)
  }

  return (
    <Box>
      {!isSent ? (
        <Button
          id="summary-email-button"
          type="submit"
          sx={formStyles.stackButton}
          variant="contained"
          color="primary"
          onClick={submitFormData}
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
