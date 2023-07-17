import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from '@mui/material'

import Markdown from '../Common/Markdown'

import { ShareResultEmails, ShareResultsZod } from '../../../validators/emails'

import styles from '../../styles'

const ShareResult = () => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)

  const { cardStyles } = styles

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(ShareResultsZod),
    defaultValues: {
      emails: [],
    },
  })

  const onSubmit = (data: ShareResultEmails) => {
    console.log(data)
    if (!errors?.emails) setIsSent(true)
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant='h6' sx={cardStyles.heading} component='div'>
        {t('extraAction:shareResultsTitle')}
      </Typography>
      <Markdown sx={cardStyles.content} variant='body2'>
        {t('extraAction:shareResultsContent')}
      </Markdown>

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
                    data-cy={`share-results-chip-${option}`}
                    key={option}
                    variant='outlined'
                    label={option}
                    color={
                      errors.emails && errors?.emails[index]
                        ? 'error'
                        : 'success'
                    }
                    {...getTagProps({ index })}
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
                />
              )}
            />
          )}
        />
        <Button
          data-cy='send-share-results-button'
          variant='contained'
          sx={{ mt: 4 }}
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
