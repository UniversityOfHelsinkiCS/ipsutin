import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

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

  return (
    <Box sx={cardStyles.outerBox}>
      <Box sx={resultStyles.resultWrapper}>
        <Box sx={{ m: 4 }}>
          <Typography
            data-cy='result-section-title'
            variant='h5'
            component='div'
          >
            {t('admin:entryInfoTitle')}
          </Typography>
          <Box sx={{ mx: 2 }}>
            <Typography variant='body2' sx={cardStyles.question}>
              {t('admin:entryViewSurvey')}:{' '}
              {t(`surveyNames:${entry.Survey.name}`)}
            </Typography>
            <Typography variant='body2' sx={cardStyles.question}>
              {t('admin:entryViewFaculty')}: {entry.data.faculty}
            </Typography>
            <Typography variant='body2' sx={cardStyles.question}>
              {t('admin:entryViewCreated')}:{' '}
              {new Date(entry.createdAt).toLocaleString()}
            </Typography>
            <Typography variant='body2' sx={cardStyles.question}>
              {t('admin:entryViewUpdated')}:{' '}
              {new Date(entry.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <RenderResults surveyName={entry.Survey.name} resultData={entry.data} />
      </Box>
    </Box>
  )
}

export default Entry
