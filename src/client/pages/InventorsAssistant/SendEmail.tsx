import React, { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { User } from '@backend/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormHelperText,
  TextField,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import { ShareResultEmails, ShareResultsZod } from '../../../validators/emails'
import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'
import { useLoggedInUser } from '../../hooks/useUser'
import InventionReportEmailTemplate from '../../templates/InventionReportTemplate'
import sendEmail from '../../util/mailing'

const SendEmail = () => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

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
    const templateHTML = ReactDOMServer.renderToString(
      <InventionReportEmailTemplate user={user as User} />
    )

    const subject = 'Invention Report'
    const text = `\
    ${templateHTML}

    ${resultHTML}
    `
    if (errors?.emails || emails.length === 0) return

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
      <SectionHeading level='h2'>
        {t('extraAction:shareResultsTitle')}
      </SectionHeading>
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
                    color={errors?.emails?.[index] ? 'error' : 'success'}
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
                  aria-label={t('extraAction:shareResultsTitle')}
                  placeholder={t('extraAction:shareResultInputPlaceholder')}
                  error={!!errors?.emails}
                  disabled={isSent}
                  sx={{
                    width: '55%',
                  }}
                />
              )}
            />
          )}
        />
        {!!errors?.emails && (
          <FormHelperText error>
            {t('extraAction:shareResultEmailErrors')}
          </FormHelperText>
        )}

        <Button
          data-cy='send-share-results-button'
          variant='contained'
          sx={{ mt: 2, borderRadius: '0.5rem' }}
          disabled={isSent}
          onClick={handleSubmit(onSubmit)}
        >
          {t('extraAction:shareResultSendEmails')}
        </Button>
      </form>
    </Box>
  )
}

export default SendEmail
