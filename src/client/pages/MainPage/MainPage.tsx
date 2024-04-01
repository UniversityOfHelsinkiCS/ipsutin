import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@mui/material'

import HeroSection from './HeroSection'
import ProductGrid from './ProductGrid'
import ServiceLinks from './ServiceLinks'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <HeroSection />
      <Grid container sx={{ mx: 'auto', maxWidth: '1560px' }}>
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
          <ServiceLinks />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
