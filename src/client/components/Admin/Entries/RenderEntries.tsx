import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { useEntries } from '../../../hooks/useEntry'

import EntryItem from './EntryItem'

const RenderEntries = () => {
  const { t } = useTranslation()
  const { entries, isLoading } = useEntries()

  if (isLoading || !entries) return null

  console.log(entries)

  return (
    <Box sx={{ mx: 2, mt: 8 }}>
      <Box sx={{ my: 4 }}>
        <Typography sx={{ my: 4, pl: 1 }} variant='h4'>
          {t('admin:entriesTitle')}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, mx: 4 }}>
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} />
        ))}
      </Box>
    </Box>
  )
}

export default RenderEntries
