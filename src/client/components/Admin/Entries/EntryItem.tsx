import React from 'react'
import { useTranslation } from 'react-i18next'
import { Entry } from '@backend/db/models'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import { Badge, Box, Chip, Tooltip } from '@mui/material'

interface EntryItemProps {
  entry: Entry
}

const surveyNames: { [key: number]: string } = {
  1: 'ipAssessment',
  2: 'licences',
  3: 'ideaEvaluation',
}

const EntryItem = ({ entry }: EntryItemProps) => {
  const { t } = useTranslation()

  return (
    <Box
      key={entry.id}
      sx={{
        p: 2,
        my: 2,
        border: 1,
        position: 'relative',
        '&:hover': {
          border: 1,
          borderColor: '#0288d1',
        },
      }}
    >
      <Box sx={{ mt: 1, display: 'flex' }}>
        <Tooltip title='The number represents the unique ID of the entry'>
          <Badge
            sx={{ mr: 1 }}
            badgeContent={entry.id}
            color='primary'
            max={999_999}
          >
            <FingerprintIcon />
          </Badge>
        </Tooltip>

        <Tooltip title=''>
          <Chip
            sx={{
              mx: 2,
              px: '0.3rem',
              fontWeight: 'normal',
              borderRadius: '1rem',
            }}
            label={`Survey: ${t(`surveyNames:${surveyNames[entry.surveyId]}`)}`}
            color='primary'
            variant='outlined'
            size='small'
          />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default EntryItem
