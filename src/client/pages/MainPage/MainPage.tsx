import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@mui/material'

import HeroSection from './HeroSection'
import ProductGrid from './ProductGrid'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ServiceLinks from './ServiceLinks'

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
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
    {children}
  </Typography>
)

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Grid container sx={{ mx: 'auto', maxWidth: '1560px' }}>
      <HeroSection />
      <Grid item sm={12} sx={{ px: 4, mt: 4, textAlign: 'center' }}>
        <SectionHeading>{t('mainPage:products')}</SectionHeading>
        <ProductGrid />
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        xl={12}
        sx={{ mt: 4, mb: 12, textAlign: 'center' }}
      >
        <SectionHeading>{t('mainPage:services')}</SectionHeading>
        {/* <ServiceLinks /> */}
      </Grid>
    </Grid>
  )
}
export default MainPage
