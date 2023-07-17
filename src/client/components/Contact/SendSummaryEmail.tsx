import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import useLoggedInUser from '../../hooks/useLoggedInUser'

import generateSummaryEmail from '../../templates/generateSummaryEmail'

import sendEmail from '../../util/mailing'

const SendSummaryEmail = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

  const resultHTML = sessionStorage.getItem('ipsutin-session-resultHTML')

  useEffect(() => {
    setIsSent(false)
  }, [resultHTML])

  const templateHTML = generateSummaryEmail(location.pathname.substring(1))

  const sendResults = () => {
    const subject = 'Ipsutin summary'
    const targets = [user.email]
    const text = `\
    ${templateHTML}

    ${resultHTML}
    `

    sendEmail(targets, text, subject)
      .then(() => {
        setIsSent(true)
        enqueueSnackbar(
          t('summary:pateSuccessMessage', { email: user.email }),
          {
            variant: 'success',
          }
        )
      })
      .catch(() => {
        enqueueSnackbar(t('summary:pateErrorMessage'), { variant: 'error' })
      })
  }

  if (isLoading || !user?.email) return null

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant='body1'>
        {t('summary:summaryEmailInfoText')}
      </Typography>
      <Button
        id='summary-email-button'
        variant='contained'
        sx={{ mt: 4 }}
        color='primary'
        disabled={!user?.email || isSent}
        onClick={sendResults}
      >
        {t('summary:sendSummaryMail')}
      </Button>
    </Box>
  )
}

export default SendSummaryEmail
