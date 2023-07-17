import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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

import styles from '../../styles'

const ShareResult = () => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)

  const { cardStyles } = styles

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      emails: [],
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
    setIsSent(true)
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
          render={({ field, fieldState }) => (
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
              onChange={(_, data) => field.onChange(data)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    data-cy={`share-results-chip-${option}`}
                    key={option}
                    variant='outlined'
                    label={option}
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
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
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
          {t('contact:contactTicketSend')}
        </Button>
      </form>
    </Box>
  )
}

export default ShareResult
