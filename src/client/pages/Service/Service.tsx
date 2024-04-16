/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Locales } from '@backend/types'
import { Box, Typography } from '@mui/material'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'
import { articleStyles } from '../../styles'
import { services } from '../../util/services'

const Service = () => {
  const { t, i18n } = useTranslation()
  const { serviceId } = useParams()

  const { language } = i18n

  const service = services.find((service) => service.id === serviceId)

  if (!service) throw new Error('Service not found')

  return (
    <Box component='article' sx={articleStyles.articleContainer}>
      <Box
        component='section'
        sx={{
          ...articleStyles.fullWidthSection,
          backgroundColor: service?.colors,
        }}
      >
        <Box sx={articleStyles.twoColumnSection}>
          <SectionHeading level='h1' sx={articleStyles.mainHeading}>
            {service?.title[language as keyof Locales]}
          </SectionHeading>
          {service?.description && (
            <Markdown>
              {service?.description?.[language as keyof Locales]}
            </Markdown>
          )}
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

export default Service
