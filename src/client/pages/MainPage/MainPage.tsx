import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'

import HeroSection from './HeroSection'
import ProductGrid from './ProductGrid'
import ServiceLinks from './ServiceLinks'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Grid container>
      <HeroSection />
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1560px' }}>
        <Grid item sm={12} sx={{ mt: 4, textAlign: 'center' }}>
          <SectionHeading
            level='h2'
            sx={{ py: 1, backgroundColor: '#000', color: '#fff' }}
          >
            {t('mainPage:products')}
          </SectionHeading>
          <ProductGrid />
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          xl={12}
          sx={{ mt: 4, mb: 12, textAlign: 'center' }}
        >
          <SectionHeading level='h2'>{t('mainPage:services')}</SectionHeading>
          <ServiceLinks />
        </Grid>
      </Box>
    </Grid>
  )
}
export default MainPage
