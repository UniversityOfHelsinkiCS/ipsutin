import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import styles from '../../styles'
import { LicenceResultDataProvider } from '../Licenses/LicenceResultDataContext'

import HelloBanner from './HelloBanner'
import SelectFaculty from './SelectFaculty'
import SelectSurvey from './SelectSurvey'
import Tools from './Tools'

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
          <Box sx={{ mx: 2, display: 'flex' }}>
            <SelectFaculty />
            <SelectSurvey />
          </Box>
          <LicenceResultDataProvider>
            <Outlet />
          </LicenceResultDataProvider>
        </Grid>

        <Grid item sm={12} md={5} xl={3}>
          <Tools />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
