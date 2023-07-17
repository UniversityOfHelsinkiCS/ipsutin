import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { RecommendationLabel } from '@backend/types'

import Service from './Service'
import SendContactTicket from './SendContactTicket'

interface Action {
  action: RecommendationLabel
}

const Contact = ({ action }: Action) => {
  const { t } = useTranslation()

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
        ticketEmail='his@helsinki.fi' // Check this later on
      />
    ),
    disclosure: (
      <Service
        title={t('contact:disclosureTitle')}
        content={t('contact:disclosureContent')}
      />
    ),
    incubator: (
      <Service
        title={t('contact:incubatorTitle')}
        content={t('contact:incubatorContent')}
      />
    ),
    relations: (
      <Service
        title={t('contact:relationsTitle')}
        content={t('contact:relationsContent')}
      />
    ),
    gnu_gpl: (
      <Service
        title={t('contact:gnugplTitle')}
        content={t('contact:gnugplContent')}
      />
    ),
    bsd_mit: (
      <Service
        title={t('contact:bsdmitTitle')}
        content={t('contact:bsdmitContent')}
      />
    ),
  }

  const ContactComponent = components[action]

  if (!ContactComponent) return null

  return <Box sx={{ mt: 8 }}>{ContactComponent}</Box>
}

export default Contact
