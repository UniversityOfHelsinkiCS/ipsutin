import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'

import { useEntry } from '../../../hooks/useEntry'
import styles from '../../../styles'

const { cardStyles, resultStyles } = styles

const Entry = () => {
  const { t } = useTranslation()
  const { entryId } = useParams()
  const { entry, isLoading } = useEntry(entryId)

  if (!entry || isLoading) return null

  return (
    <Box sx={cardStyles.outerBox}>
      <Box sx={resultStyles.resultWrapper}>
        <Container sx={{ mt: 4 }}>
          <Typography
            data-cy='result-section-title'
            variant='h5'
            sx={resultStyles.heading}
            component='div'
          >
            {t('results:title')}
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Entry
