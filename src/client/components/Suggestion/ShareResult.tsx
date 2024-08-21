import React, { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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

import { INNOVATION_SERVICES_EMAIL } from '../../../config'
import { ShareResultEmails, ShareResultsZod } from '../../../validators/emails'
import { useLoggedInUser } from '../../hooks/useUser'
import sendEmail from '../../util/mailing'
import Markdown from '../Common/Markdown'
import SectionHeading from '../Common/SectionHeading'

import HoverCheckbox from './HoverCheckBox'

// Define the form data interface
interface ShareResultFormValues {
  emails: string[] // Define emails as an array of strings
}

interface ShareResultProps {
  emailSubject: string
  templateComponent: React.ReactNode
}

const ShareResult = ({ emailSubject, templateComponent }: ShareResultProps) => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()
  const [yourselfChecked, setYourselfChecked] = useState(true)
  const [InnovationServicesChecked, setInnovationServicesChecked] =
    useState(false)

  const resultHTML = sessionStorage.getItem('ipsutin-session-resultHTML')

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ShareResultFormValues>({
    mode: 'all',
    resolver: zodResolver(ShareResultsZod),
    defaultValues: {
      emails: [],
    },
  })

  useEffect(() => {
    setIsSent(false)
  }, [resultHTML])

  useEffect(() => {
    if (!user?.email) return

    const emails: string[] = [] // Explicitly type the emails array
    if (yourselfChecked) emails.push(user.email)
    if (InnovationServicesChecked) emails.push(INNOVATION_SERVICES_EMAIL)

    setValue('emails', emails) // This should now be correctly typed
  }, [reset, user, yourselfChecked, InnovationServicesChecked, setValue])

  const onSubmit = ({ emails }: ShareResultEmails) => {
    if (errors?.emails || emails.length === 0) return

    const templateHTML = ReactDOMServer.renderToString(templateComponent)

    const subject = emailSubject
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
      <SectionHeading level='h2'>
        {t('extraAction:shareResultsTitle')}
      </SectionHeading>
      <Markdown>{t('extraAction:shareResultsContent')}</Markdown>

      <form onSubmit={handleSubmit(onSubmit)}>
        <HoverCheckbox
          checkBoxChecked={yourselfChecked}
          setCheckBoxChecked={setYourselfChecked}
          isSent={isSent}
          label={t('extraAction:shareResultsYourself')}
          alertLabel={t('extraAction:shareResultsYourselfAlertLabel')}
        />
        <HoverCheckbox
          checkBoxChecked={InnovationServicesChecked}
          setCheckBoxChecked={setInnovationServicesChecked}
          isSent={isSent}
          label={t('extraAction:shareResultsInnovationServices')}
          alertLabel={t('extraAction:shareResultsInnovationServicesAlertLabel')}
        />

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

export default ShareResult
