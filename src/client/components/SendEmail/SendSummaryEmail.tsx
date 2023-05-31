import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Box, Button } from '@mui/material'

import styles from '../../styles'
import apiClient from '../../util/apiClient'
import { InputProps } from '../../types'
import useLoggedInUser from '../../hooks/useLoggedInUser'
import getQuestionsAndLabels from '../../util/getQuestionsAndLabels'

const SendSummaryEmail = ({ watch }: InputProps) => {
  const [answers, setAnswers] = useState<any>({})
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

  const { common, formStyles } = styles

  const sendResultsToEmail = async (targets: string[], text: string) => {
    apiClient.post('/summary', {
      targets,
      text,
      subject: 'Ipsutin summary',
    })
  }

  const sendResults = async () => {
    const modifiedText = Object.keys(answers)
      .map((answer, index) => `${answer}: ${Object.values(answers)[index]}\n\n`)
      .join('')
    const targets = [user?.email]
    const text = `

    Summary
    ============================

    ${modifiedText}

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

  const submitFormData = () => {
    const formResultData = watch()
    setAnswers(getQuestionsAndLabels({ formResultData }))
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
