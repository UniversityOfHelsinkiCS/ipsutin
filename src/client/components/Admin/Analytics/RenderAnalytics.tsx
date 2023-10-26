import React from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Box, Grid, Link } from '@mui/material'

import FacultyAnalytics from './FacultyAnalytics'
import SurveyAnalytics from './SurveyAnalytics'
import UserCountAnalytics from './UserCountAnalytics'

const RenderAnalytics = () => {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Alert severity='info'>
          <Link target='_blank' rel='noopener' href={t('admin:grafanaExtLink')}>
            Grafana
          </Link>
        </Alert>
      </Box>
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
    </>
  )
}

export default RenderAnalytics
