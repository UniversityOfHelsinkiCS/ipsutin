import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { RecommendationLabel } from '@backend/types'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import LinkWithQuery from '../Common/LinkWithQuery'

import SendContactTicket from './SendContactTicket'
import Service from './Service'

interface Action {
  action: RecommendationLabel
}

const { cardStyles } = styles

const Contact = ({ action }: Action) => {
  const { t } = useTranslation()

  // Action prop is the most recommended 'service' that is used to determine which of the
  // following components are rendered.
  const components: { [key in RecommendationLabel]?: ReactElement } = {
    clinic: (
      <SendContactTicket
        title={t('contact:clinicTitle')}
        content={t('contact:clinicContent')}
        ticketEmail='his@helsinki.fi'
      />
    ),
    legal: (
      <SendContactTicket
        title={t('contact:legalTitle')}
        content={t('contact:legalContent')}
        ticketEmail='researchlawyers@helsinki.fi'
      />
    ),
    disclosure: (
      <Service
        title={t('services:disclosureTitle')}
        content={t('services:disclosureContent')}
      >
        <LinkWithQuery
          data-cy='disclosure-ext-button'
          to={t('services:disclosureExtLink')}
        >
          {t('services:disclosure')}
        </LinkWithQuery>
      </Service>
    ),
    incubator: (
      <Service
        title={t('services:incubatorTitle')}
        content={t('services:incubatorContent')}
      >
        <LinkWithQuery
          data-cy='incubator-ext-button'
          to={t('services:incubatorExtLink')}
        >
          {t('services:incubator')}
        </LinkWithQuery>
      </Service>
    ),
    relations: (
      <>
        <SendContactTicket
          title={t('contact:relationsTitle')}
          content={t('contact:relationsContent')}
          ticketEmail='businessteam@helsinki.fi'
        />
        <Service
          title={t('services:relationsTitle')}
          content={t('services:relationsContent')}
          sx={{ mt: 4 }}
        >
          <LinkWithQuery
            data-cy='relations-ext-button'
            to={t('services:relationsExtLink')}
          >
            {t('services:relations')}
          </LinkWithQuery>
        </Service>
      </>
    ),
    restrictive: (
      <Service
        title={t('services:gnugplTitle')}
        content={t('services:gnugplContent')}
      />
    ),
    permissive: (
      <Service
        title={t('services:bsdmitTitle')}
        content={t('services:bsdmitContent')}
      />
    ),
  }

  // Get the corresponding components for the most recommended action from the components tree.
  const ContactComponent = components[action]

  if (!ContactComponent) return null

  return (
    <Box id='recommended-contact' sx={{ mt: 8 }}>
      <Typography variant='h6' sx={cardStyles.heading} component='div'>
        {t('contact:title')}
      </Typography>
      {ContactComponent}
    </Box>
  )
}

export default Contact
