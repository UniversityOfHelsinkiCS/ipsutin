import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import Tools from './Tools'
import HelloBanner from './HelloBanner'
import SelectSurvey from './SelectSurvey'
import SelectFaculty from './SelectFaculty'

import styles from '../../styles'

const MainPage = () => {
  const { formStyles } = styles

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item sm={12}>
          <HelloBanner />
        </Grid>
        <Grid
          container
          item
          sm={12}
          md={7}
          xl={8}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item xl={12}>
            <Box sx={{ mx: 2, display: 'flex' }}>
              <SelectFaculty />
              <SelectSurvey />
            </Box>
            <Outlet />
          </Grid>
        </Grid>
        <Grid item sm={12} md={5} xl={3}>
          <Tools />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
