import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import styles from '../../styles'

import ProductGrid from './ProductGrid'
import SelectFaculty from './SelectFaculty'
import Tools from './Tools'

const MainPage = () => {
  const { formStyles } = styles

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item sm={12}>
          <ProductGrid />
        </Grid>

        <Grid container item sm={12} md={7} xl={8} sx={{ display: 'flex' }}>
          <Box sx={{ mx: 2, display: 'flex' }}>
            <SelectFaculty />
          </Box>

          <Outlet />
        </Grid>

        <Grid item sm={12} md={5} xl={4}>
          <Tools />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
