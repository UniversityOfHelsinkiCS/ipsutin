import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'

import { useEntry } from '../../../hooks/useEntry'
import useResults from '../../../hooks/useResults'
import styles from '../../../styles'

import RenderResults from './RenderResults'

const { cardStyles, resultStyles } = styles

const Entry = () => {
  const { t } = useTranslation()
  const { entryId } = useParams()
  const { entry, isLoading } = useEntry(entryId)
  const { results, isSuccess: resultsFetched } = useResults(entry?.surveyId)

  if (!entry || isLoading || !results || !resultsFetched) return null

  console.log(entry)

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

        <RenderResults surveyName={entry.Survey.name} resultData={entry.data} />
      </Box>
    </Box>
  )
}

export default Entry
