import React, { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SurveyName, User } from '@backend/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import { ShareResultEmails, ShareResultsZod } from '../../../validators/emails'
import { useLoggedInUser } from '../../hooks/useUser'
import styles from '../../styles'
import ShareResultsEmailTemplate from '../../templates/ShareResultsEmailTemplate'
import sendEmail from '../../util/mailing'
import Markdown from '../Common/Markdown'

interface ShareResultProps {
  surveyName: SurveyName
}

const ShareResult = ({ surveyName }: ShareResultProps) => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

  const { cardStyles } = styles

  const resultHTML = sessionStorage.getItem('ipsutin-session-resultHTML')

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(ShareResultsZod),
    defaultValues: {
      emails: [''],
    },
  })

  useEffect(() => {
    setIsSent(false)
  }, [resultHTML])

  useEffect(() => {
    if (!user?.email) return

    reset({ emails: [user.email] })
  }, [reset, user])

  const onSubmit = ({ emails }: ShareResultEmails) => {
    if (errors?.emails || emails.length === 0) return

    const templateHTML = ReactDOMServer.renderToString(
      <ShareResultsEmailTemplate user={user as User} surveyName={surveyName} />
    )

    const subject = 'Ipsutin shared results'
    const text = `\
    ${templateHTML}

    ${resultHTML}
    `

    sendEmail(emails, text, subject)
      .then(() => {
        setIsSent(true)
        enqueueSnackbar(t('extraAction:pateSuccessMessage'), {
          variant: 'success',
        })
      })
      .catch(() => {
        enqueueSnackbar(t('extraAction:pateErrorMessage'), { variant: 'error' })
      })
  }

  if (isLoading || !user) return null

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant='h6' sx={cardStyles.heading} component='div'>
        {t('extraAction:shareResultsTitle')}
      </Typography>
      <Markdown>{t('extraAction:shareResultsContent')}</Markdown>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='emails'
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              data-cy='share-results'
              size='small'
              multiple
              options={[]}
              freeSolo
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              disabled={isSent}
              onChange={(_, data) => field.onChange(data)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    data-cy={`share-results-chip-${option}`}
                    key={option}
                    variant='outlined'
                    label={option}
                    color={
                      errors.emails && errors?.emails[index]
                        ? 'error'
                        : 'success'
                    }
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  data-cy='share-results-input'
                  size='small'
                  margin='dense'
                  variant='outlined'
                  placeholder={t('extraAction:shareResultInputPlaceholder')}
                  error={!!errors?.emails}
                  disabled={isSent}
                  style={{
                    width: '55%',
                  }}
                />
              )}
            />
          )}
        />
        <Button
          data-cy='send-share-results-button'
          variant='contained'
          sx={{ mt: 2 }}
          disabled={isSent}
          onClick={handleSubmit(onSubmit)}
        >
          {t('extraAction:shareResultSendEmails')}
        </Button>
      </form>
    </Box>
  )
}

export default ShareResult
