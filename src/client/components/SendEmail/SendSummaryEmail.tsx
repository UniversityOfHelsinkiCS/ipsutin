import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import useLoggedInUser from '../../hooks/useLoggedInUser'

import generateSummaryEmail from '../../templates/generateSummaryEmail'

import styles from '../../styles'
import apiClient from '../../util/apiClient'

const SendSummaryEmail = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

  const { formStyles } = styles

  const resultHTML = sessionStorage.getItem('ipsutin-session-resultHTML')

  useEffect(() => {
    setIsSent(false)
  }, [resultHTML])

  const templateHTML = generateSummaryEmail(location.pathname.substring(1))

  const sendResultsToEmail = async (targets: string[], text: string) => {
    apiClient.post('/summary', {
      targets,
      text,
      subject: 'Ipsutin summary',
    })
  }

  const sendResults = () => {
    const targets = [user.email]
    const text = `\
    ${templateHTML}

    ${resultHTML}
    `

    sendResultsToEmail(targets, text)
      .then(() => {
        setIsSent(true)
        enqueueSnackbar(
          t('contact:pateSuccessMessage', { email: user.email }),
          {
            variant: 'success',
          }
        )
      })
      .catch(() => {
        enqueueSnackbar(t('contact:pateErrorMessage'), { variant: 'error' })
      })
  }

  if (isLoading || !user?.email) return null

  return (
    <Box>
      <Button
        id='summary-email-button'
        sx={formStyles.stackButton}
        variant='contained'
        color='primary'
        disabled={!user?.email || isSent}
        onClick={sendResults}
      >
        {t('results:sendSummaryMail')}
      </Button>
    </Box>
  )
}

export default SendSummaryEmail
