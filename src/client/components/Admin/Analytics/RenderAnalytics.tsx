import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, Typography } from '@mui/material'

import { useEntries } from '../../../hooks/useEntry'
import useFaculties from '../../../hooks/useFaculty'
import useUserCounts from '../../../hooks/useUserCounts'
import styles from '../../../styles'
import LoadingProgress from '../../Common/LoadingProgress'

import FacultyAnalytics from './FacultyAnalytics'
import SurveyAnalytics from './SurveyAnalytics'
import UserCountAnalytics from './UserCountAnalytics'

const { resultStyles } = styles

const RenderAnalytics = () => {
  const { t } = useTranslation()
  const { userCounts, isLoading: isUserCountLoading } = useUserCounts()
  const { entries, isLoading: isEntriesLoading } = useEntries()
  const { faculties, isLoading: isFacultiesLoading } = useFaculties()

  if (isUserCountLoading || isEntriesLoading || isFacultiesLoading) {
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
        <Grid item xs={12} xl={8}>
          <FacultyAnalytics entries={entries} faculties={faculties} />
        </Grid>
        <Grid item xs={12} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SurveyAnalytics entries={entries} />
            </Grid>
            <Grid item xs={6}>
              <UserCountAnalytics userCounts={userCounts} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RenderAnalytics
