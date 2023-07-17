import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete, Box, Chip, TextField, Typography } from '@mui/material'

import Markdown from '../Common/Markdown'

import styles from '../../styles'

const ShareResult = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState<string[] | null>([])

  const { cardStyles } = styles

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant='h6' sx={cardStyles.heading} component='div'>
        {t('extraAction:shareResultsTitle')}
      </Typography>
      <Markdown sx={cardStyles.content} variant='body2'>
        {t('extraAction:shareResultsContent')}
      </Markdown>

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        data-cy='share-results'
        size='small'
        multiple
        options={[]}
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
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
          />
        )}
      />
    </Box>
  )
}

export default ShareResult
