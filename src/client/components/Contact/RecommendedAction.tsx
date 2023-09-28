import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { RecommendationLabel } from '@backend/types'
import { Box } from '@mui/material'

import LinkWithQuery from '../Common/LinkWithQuery'

import SendContactTicket from './SendContactTicket'
import Service from './Service'

interface Action {
  action: RecommendationLabel
}

const RecommendedAction = ({ action }: Action) => {
  const { t } = useTranslation()

  // Action prop is the most recommended 'service' that is used to determine which of the
  // following components are rendered.
  const components: { [key in RecommendationLabel]?: ReactElement } = {
    clinic: (
      <SendContactTicket
        title={t('recommendedAction:clinicTitle')}
        content={t('recommendedAction:clinicContent')}
        ticketEmail='his@helsinki.fi'
      />
    ),
    legal: (
      <SendContactTicket
        title={t('recommendedAction:legalTitle')}
        content={t('recommendedAction:legalContent')}
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
          title={t('recommendedAction:relationsTitle')}
          content={t('recommendedAction:relationsContent')}
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
  const RecommendedActionComponent = components[action]

  if (!RecommendedActionComponent) return null

  return (
    <Box id='recommended-action-component' sx={{ mt: 4, mb: 8 }}>
      {RecommendedActionComponent}
    </Box>
  )
}

export default RecommendedAction
