import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import Chips from '../../components/Chip/ChipLabel'
import WelcomeView from '../../components/HeroPage/WelcomeView'
import styles from '../../styles'

import ProductGrid from './ProductGrid'

const MainPage = () => {
  const { formStyles } = styles

  return (
    <Box id='big-box' sx={formStyles.formWrapper}>
      <Grid container>
        <WelcomeView />
        <Grid item sm={12}>
          <ProductGrid />
        </Grid>
        <Grid container item sm={12} md={12} xl={12} sx={{ display: 'flex' }}>
          <Box id='important-box' sx={{ width: '100%' }}>
            <Chips />
          </Box>

          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
