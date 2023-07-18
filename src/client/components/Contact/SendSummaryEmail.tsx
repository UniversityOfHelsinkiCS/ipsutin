import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import useLoggedInUser from '../../hooks/useLoggedInUser'
import styles from '../../styles'
import generateSummaryEmail from '../../templates/generateSummaryEmail'
import sendEmail from '../../util/mailing'

const SendSummaryEmail = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

  const { cardStyles } = styles

  const resultHTML = sessionStorage.getItem('ipsutin-session-resultHTML')

  useEffect(() => {
    setIsSent(false)
  }, [resultHTML])

  const sendResults = () => {
    const templateHTML = generateSummaryEmail(location.pathname.substring(1))

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
      <Typography variant='h6' sx={cardStyles.heading} component='div'>
        {t('summary:summaryEmailInfoText')}
      </Typography>
      <Box>
        <Button
          id='summary-email-button'
          variant='contained'
          color='primary'
          disabled={!user?.email || isSent}
          onClick={sendResults}
        >
          {t('summary:sendSummaryMail')}
        </Button>
      </Box>
    </Box>
  )
}

export default SendSummaryEmail
