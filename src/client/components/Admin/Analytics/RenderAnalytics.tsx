import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Typography } from '@mui/material'

import { useEntries } from '../../../hooks/useEntry'
import useFaculties from '../../../hooks/useFaculty'
import styles from '../../../styles'
import LoadingProgress from '../../Common/LoadingProgress'

import FacultyAnalytics from './FacultyAnalytics'
import SurveyAnalytics from './SurveyAnalytics'

const { resultStyles } = styles

const RenderAnalytics = () => {
  const { t } = useTranslation()
  const { entries, isLoading: isEntriesLoading } = useEntries()
  const { faculties, isLoading: isFacultiesLoading } = useFaculties()

  if (isEntriesLoading || isFacultiesLoading) {
    return <LoadingProgress />
  }

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography
          data-cy='analytics-section-title'
          variant='h5'
          sx={resultStyles.heading}
          component='div'
        >
          {t('admin:analyticsViewTitle')}
        </Typography>
      </Container>

      <FacultyAnalytics entries={entries} faculties={faculties} />
      <SurveyAnalytics entries={entries} />
    </>
  )
}

export default RenderAnalytics
