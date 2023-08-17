import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, Typography } from '@mui/material'

import { useEntries } from '../../../hooks/useEntry'
import useFaculties from '../../../hooks/useFaculty'
import styles from '../../../styles'
import LoadingProgress from '../../Common/LoadingProgress'

import FacultyAnalytics from './FacultyAnalytics'
import SurveyAnalytics from './SurveyAnalytics'
import UserCountAnalytics from './UserCountAnalytics'

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

      <Grid container spacing={2}>
        <Grid xs={12} lg={8}>
          <FacultyAnalytics entries={entries} faculties={faculties} />
        </Grid>
        <Grid xs={12} lg={8}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <SurveyAnalytics entries={entries} />
            </Grid>
            <Grid xs={4}>
              <UserCountAnalytics />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RenderAnalytics
