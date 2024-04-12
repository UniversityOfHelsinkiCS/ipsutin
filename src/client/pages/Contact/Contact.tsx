import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@mui/material'

import illustration from '../../assets/contact_us_section.png'
import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'
import { articleStyles } from '../../styles'

const CurrentTime = () => {
  const { t } = useTranslation()

  const date = new Date()
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return <Markdown>{t('contact:currentTime', { time })}</Markdown>
}

const Contact = () => {
  const { t } = useTranslation()

  const styles = {
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
    <Box component='article' sx={articleStyles.articleContainer}>
      <Grid container component='section' sx={articleStyles.section}>
        <Grid item md={6}>
          <SectionHeading level='h1' sx={articleStyles.mainHeading}>
            {t('contact:mainHeading')}
          </SectionHeading>
          <Typography variant='body1' sx={{ mt: 12 }}>
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
        sx={{ borderTop: '1px solid', ...articleStyles.section }}
      >
        <SectionHeading level='h2' sx={articleStyles.sectionHeading}>
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
              <Box component='dd' sx={styles.descriptionDetail}>
                <CurrentTime />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box component='section' sx={articleStyles.section}>
        <SectionHeading level='h2' sx={articleStyles.sectionHeading}>
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
