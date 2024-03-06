import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import Chips from '../../components/Chip/ChipLabel'
import styles from '../../styles'

import ProductGrid from './ProductGrid'
import SelectFaculty from './SelectFaculty'

const MainPage = () => {
  const { formStyles } = styles

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item sm={12}>
          <ProductGrid />
        </Grid>
        <Grid container item sm={12} md={12} xl={12} sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex' }}>
            <SelectFaculty />
            <Chips />
          </Box>

          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
