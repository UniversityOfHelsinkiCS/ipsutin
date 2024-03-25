import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@mui/material'

import styles from '../../styles'

import HeroSection from './HeroSection'
import ProductGrid from './ProductGrid'
import Services from './Services'

const MainPage = () => {
  const { t } = useTranslation()

  const { formStyles } = styles

  return (
    <Box id='big-box' sx={formStyles.formWrapper}>
      <Grid container>
        <HeroSection />
        <Grid item sm={12} sx={{ px: 4, mt: 4, textAlign: 'center' }}>
          <Typography
            component='h2'
            sx={{
              mb: 2,
              fontSize: '24pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '-0.1rem',
            }}
          >
            {t('mainPage:products')}
          </Typography>
          <ProductGrid />
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          xl={12}
          sx={{ mt: 4, mb: 12, textAlign: 'center' }}
        >
          <Typography
            component='h2'
            sx={{
              mb: 2,
              fontSize: '24pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '-0.1rem',
            }}
          >
            {t('mainPage:services')}
          </Typography>
          <Services />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
