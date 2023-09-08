import React from 'react'
import { Grid } from '@mui/material'

import { useEntries } from '../../../hooks/useEntry'
import LoadingProgress from '../../Common/LoadingProgress'

import FacultyAnalytics from './FacultyAnalytics'
import SurveyAnalytics from './SurveyAnalytics'
import SurveyQuestionAnalytics from './SurveyQuestionAnalytics'
import UserCountAnalytics from './UserCountAnalytics'

const RenderAnalytics = () => {
  const { entries, isLoading: isEntriesLoading } = useEntries()

  if (!entries || isEntriesLoading) {
    return <LoadingProgress />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={8}>
        <FacultyAnalytics />
      </Grid>
      <Grid item xs={12} xl={8}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SurveyAnalytics entries={entries} />
          </Grid>
          <Grid item xs={6}>
            <UserCountAnalytics />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} xl={8}>
        <SurveyQuestionAnalytics entries={entries} />
      </Grid>
    </Grid>
  )
}

export default RenderAnalytics
