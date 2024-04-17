import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Locales } from '@backend/types'
import {
  Box,
  getContrastRatio,
  List,
  ListItem,
  Typography,
} from '@mui/material'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'
import SendContactTicket from '../../components/Recommendation/SendContactTicket'
import { articleStyles } from '../../styles'
import { Service } from '../../types'
import { services } from '../../util/services'

const ServiceContact = (service: Service) => {
  const { i18n } = useTranslation()

  const { language } = i18n

  const { contact } = service

  if (!contact) throw new Error('Service contact not found')

  if (contact.method === 'manual') {
    return (
      <Typography variant='body1'>
        {contact.data.content[language as keyof Locales]}
      </Typography>
    )
  }
  if (
    contact.method === 'form' &&
    contact?.data?.title &&
    contact?.data?.formEmail
  ) {
    return (
      <SendContactTicket
        title={contact.data.title[language as keyof Locales]}
        content={contact.data.content[language as keyof Locales]}
        ticketEmail={contact.data.formEmail}
        open
      />
    )
  }

  return null
}

const ServicePage = () => {
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
          color:
            getContrastRatio(service.colors.background, '#fff') > 4.5
              ? '#fff'
              : '#000',
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

      {service?.contact && (
        <Box
          component='section'
          sx={{ borderTop: '1px solid', ...articleStyles.section }}
        >
          <SectionHeading level='h2' sx={articleStyles.sectionHeading}>
            {t('services:contactHeading')}
          </SectionHeading>
          <ServiceContact {...service} />
        </Box>
      )}

      {service?.links && (
        <Box component='section' sx={articleStyles.section}>
          <SectionHeading level='h2' sx={articleStyles.sectionHeading}>
            {t('services:extRedirectHeading')}
          </SectionHeading>

          <List>
            {service.links.map((link) => (
              <ListItem key={link.en}>
                <Markdown>{link[language as keyof Locales]}</Markdown>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default ServicePage
