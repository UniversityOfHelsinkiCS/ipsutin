import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@mui/material'

import illustration from '../../assets/contact_us_section.png'
import SectionHeading from '../../components/Common/SectionHeading'

const Contact = () => {
  const { t } = useTranslation()

  const styles = {
    section: {
      my: { xs: 8, md: 24 },
    },
    sectionHeading: {
      fontFamily: 'Georgia, serif',
      fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
      letterSpacing: '-0.02rem',
      fontWeight: 400,
      mt: 2,
    },
    contactDetails: {
      display: 'flex',
      gap: 2,
    },
    sameRow: {
      display: 'flex',
      gap: 1,
    },
    descriptionTerm: {
      fontWeight: 'bold',
    },
    descriptionDetail: {
      marginInlineStart: 0,
    },
  }

  return (
    <Box
      component='section'
      sx={{ maxWidth: '1024px', m: { xs: 1, sm: 2, md: 8, lg: 12 } }}
    >
      <Grid container component='section' sx={{ my: 8 }}>
        <Grid item md={6}>
          <SectionHeading
            level='h1'
            sx={{
              fontSize: { xs: '28pt', sm: '32pt', md: '38pt', lg: '48pt' },
            }}
          >
            {t('contact:mainHeading')}
          </SectionHeading>
          <Typography variant='body1' sx={{ mt: 8 }}>
            {t('contact:mainContent')}
          </Typography>
        </Grid>
        <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <img
            src={illustration}
            alt=''
            style={{ width: '400px', height: '400px', borderRadius: '8px' }}
          />
        </Grid>
      </Grid>

      <Box
        component='section'
        sx={{ borderTop: '1px solid', ...styles.section }}
      >
        <SectionHeading level='h2' sx={styles.sectionHeading}>
          {t('contact:informationHeading')}
        </SectionHeading>
        <Grid container sx={{ mt: 8, gap: { xs: 2, md: 8 } }}>
          <Grid item component='dl'>
            <Box component='dt' sx={styles.descriptionTerm}>
              {t('contact:informationContent:name')}
            </Box>
            <Box component='dd' sx={styles.descriptionDetail}>
              {t('contact:informationContent:address')}
            </Box>
            <Box component='dd' sx={styles.descriptionDetail}>
              {t('contact:informationContent:postalCode')}
            </Box>
            <Box component='dd' sx={styles.descriptionDetail}>
              {t('contact:informationContent:city')}
            </Box>
          </Grid>
          <Grid item component='dl'>
            <Box sx={styles.sameRow}>
              <Box component='dt' sx={styles.descriptionTerm}>
                {t('contact:website')}{' '}
              </Box>
              <Box component='dd' sx={styles.descriptionDetail}>
                <a
                  href={t('contact:officeExtLink')}
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('contact:officeExtLink')}
                </a>
              </Box>
            </Box>
            <Box sx={styles.sameRow}>
              <Box component='dt' sx={styles.descriptionTerm}>
                {t('contact:email')}
              </Box>
              <Box component='dd' sx={styles.descriptionDetail}>
                <a href={`mailto:${t('contact:emailAddress')}`}>
                  {t('contact:emailAddress')}
                </a>
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Box component='dt' sx={styles.descriptionTerm}>
                {t('contact:office')}
              </Box>
              <Box component='dd' sx={styles.descriptionDetail}>
                {t('contact:officeHours')}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box component='section' sx={styles.section}>
        <SectionHeading level='h2' sx={styles.sectionHeading}>
          {t('contact:endingHeading')}
        </SectionHeading>
        <Typography variant='body1' color='text.secondary'>
          {t('contact:endingContent')}
        </Typography>
      </Box>
    </Box>
  )
}

export default Contact
