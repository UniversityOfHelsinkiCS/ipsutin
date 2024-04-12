import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'

const About = () => {
  const { t } = useTranslation()

  const styles = {
    section: {
      my: { xs: 8, md: 24 },
    },
    sectionHeading: {
      fontFamily: 'Georgia',
      fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
      letterSpacing: '-0.02rem',
      fontWeight: 400,
      mt: 2,
    },
  }

  return (
    <Box
      component='section'
      sx={{ maxWidth: '1024px', m: { xs: 1, sm: 2, md: 8, lg: 12 } }}
    >
      <Box
        component='section'
        sx={{
          my: 8,
          display: { md: 'flex' },
          alignItems: 'center',
          gap: { md: 8, lg: 24 },
        }}
      >
        <SectionHeading
          level='h1'
          sx={{ fontSize: { xs: '28pt', sm: '32pt', md: '38pt', lg: '48pt' } }}
        >
          {t('about:mainHeading')}
        </SectionHeading>
        <Typography variant='body1'>{t('about:mainContent')}</Typography>
      </Box>

      <Box
        component='section'
        sx={{ borderTop: '1px solid', ...styles.section }}
      >
        <SectionHeading level='h2' sx={styles.sectionHeading}>
          {t('about:journeyHeading')}
        </SectionHeading>
        <Typography variant='body1' color='text.secondary'>
          {t('about:journeyContent')}
        </Typography>
      </Box>

      <Box component='section' sx={styles.section}>
        <SectionHeading level='h2' sx={styles.sectionHeading}>
          {t('about:visionHeading')}
        </SectionHeading>
        <Typography variant='body1' color='text.secondary'>
          {t('about:visionContent')}
        </Typography>
      </Box>

      <Box component='section' sx={styles.section}>
        <SectionHeading level='h2' sx={styles.sectionHeading}>
          {t('about:futureHeading')}
        </SectionHeading>
        <Typography variant='body1' color='text.secondary'>
          {t('about:futureContent')}
        </Typography>
      </Box>
    </Box>
  )
}

export default About
