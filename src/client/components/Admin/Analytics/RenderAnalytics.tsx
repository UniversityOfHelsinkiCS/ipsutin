import React from 'react'
import { Grid } from '@mui/material'

import FacultyAnalytics from './FacultyAnalytics'
import SurveyAnalytics from './SurveyAnalytics'
import UserCountAnalytics from './UserCountAnalytics'

const RenderAnalytics = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} xl={8}>
      <FacultyAnalytics />
    </Grid>
    <Grid item xs={12} xl={8}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SurveyAnalytics />
        </Grid>
        <Grid item xs={6}>
          <UserCountAnalytics />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

export default RenderAnalytics
