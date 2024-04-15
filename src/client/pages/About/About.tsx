import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'
import { articleStyles } from '../../styles'

const About = () => {
  const { t } = useTranslation()

  return (
    <Box component='article' sx={articleStyles.articleContainer}>
      <Box component='section' sx={articleStyles.fullWidthSection}>
        <Box sx={articleStyles.twoColumnSection}>
          <SectionHeading level='h1' sx={articleStyles.mainHeading}>
            {t('about:mainHeading')}
          </SectionHeading>
          <Typography variant='body1'>{t('about:mainContent')}</Typography>
        </Box>
      </Box>

      <Box
        component='section'
        sx={{ borderTop: '1px solid', ...articleStyles.section }}
      >
        <SectionHeading level='h2' sx={articleStyles.sectionHeading}>
          {t('about:journeyHeading')}
        </SectionHeading>
        <Typography variant='body1' color='text.secondary'>
          {t('about:journeyContent')}
        </Typography>
      </Box>

      <Box component='section' sx={articleStyles.section}>
        <SectionHeading level='h2' sx={articleStyles.sectionHeading}>
          {t('about:visionHeading')}
        </SectionHeading>
        <Typography variant='body1' color='text.secondary'>
          {t('about:visionContent')}
        </Typography>
      </Box>

      <Box component='section' sx={articleStyles.section}>
        <SectionHeading level='h2' sx={articleStyles.sectionHeading}>
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
