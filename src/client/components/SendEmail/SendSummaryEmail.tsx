import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Box, Button } from '@mui/material'

import useLoggedInUser from '../../hooks/useLoggedInUser'

import generateSummaryEmail from '../../templates/generateSummaryEmail'

import styles from '../../styles'
import apiClient from '../../util/apiClient'

const SendSummaryEmail = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

  const { common, formStyles } = styles

  const resultHTML = sessionStorage.getItem('ipsutin-session-resultHTML')

  const templateHTML = generateSummaryEmail(location.pathname.substring(1))

  const sendResultsToEmail = async (targets: string[], text: string) => {
    apiClient.post('/summary', {
      targets,
      text,
      subject: 'Ipsutin summary',
    })
  }

  const sendResults = async () => {
    const targets = ['henri.remonen@helsinki.fi']
    const text = `\
    ${templateHTML}

    ${resultHTML}
    `

    try {
      await sendResultsToEmail(targets, text)
      setIsSent(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading || !user?.email) return null

  return (
    <Box>
      {!isSent ? (
        <Button
          id="summary-email-button"
          sx={formStyles.stackButton}
          variant="contained"
          color="primary"
          disabled={!user?.email}
          onClick={sendResults}
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
