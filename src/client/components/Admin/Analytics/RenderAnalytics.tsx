import React from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Container, Typography } from '@mui/material'

import { useEntries } from '../../../hooks/useEntry'
import useFaculties from '../../../hooks/useFaculty'
import styles from '../../../styles'

import FacultyAnalytics from './FacultyAnalytics'

const { resultStyles } = styles

const RenderAnalytics = () => {
  const { t } = useTranslation()
  const { entries, isLoading: isEntriesLoading } = useEntries()
  const { faculties, isLoading: isFacultiesLoading } = useFaculties()

  if (isEntriesLoading || isFacultiesLoading) {
    return <CircularProgress />
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
    </>
  )
}

export default RenderAnalytics
