import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { RecommendationLabel } from '@backend/types'
import { Box } from '@mui/material'

import LinkWithQuery from '../Common/LinkWithQuery'

import RecommendationDetails from './RecommendationDetails'
import SendContactTicket from './SendContactTicket'

interface Action {
  action: RecommendationLabel
}

const RecommendedAction = ({ action }: Action) => {
  const { t } = useTranslation()

  // Action prop is the most recommended 'service' that is used to determine which of the
  // following elements are rendered.
  const elements: { [key in RecommendationLabel]?: ReactElement } = {
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
      <RecommendationDetails
        title={t('services:disclosureTitle')}
        content={t('services:disclosureContent')}
      >
        <LinkWithQuery
          data-cy='disclosure-ext-button'
          to={t('services:disclosureExtLink')}
        >
          {t('services:disclosure')}
        </LinkWithQuery>
      </RecommendationDetails>
    ),
    incubator: (
      <RecommendationDetails
        title={t('services:incubatorTitle')}
        content={t('services:incubatorContent')}
      >
        <LinkWithQuery
          data-cy='incubator-ext-button'
          to={t('services:incubatorExtLink')}
        >
          {t('services:incubator')}
        </LinkWithQuery>
      </RecommendationDetails>
    ),
    relations: (
      <>
        <SendContactTicket
          title={t('recommendedAction:relationsTitle')}
          content={t('recommendedAction:relationsContent')}
          ticketEmail='businessteam@helsinki.fi'
        />
        <RecommendationDetails
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
        </RecommendationDetails>
      </>
    ),
    restrictive: (
      <>
        <RecommendationDetails
          title={t('services:gnugplTitle')}
          content={t('services:gnugplContent')}
        >
          <LinkWithQuery
            data-cy='idea-evaluation-ext-button'
            to='/ideaevaluation'
          >
            {t('surveyNames:ideaEvaluation')}
          </LinkWithQuery>

          <LinkWithQuery
            data-cy='idea-evaluation-ext-button'
            sx={{ ml: 2 }}
            to='/ipassessment'
          >
            {t('surveyNames:ipAssessment')}
          </LinkWithQuery>
        </RecommendationDetails>

        <RecommendationDetails
          sx={{ mt: 4 }}
          title={t('services:openSourceLegalSuggestionTitle')}
          content=''
        >
          <SendContactTicket
            title={t('recommendedAction:legalTitle')}
            content={t('recommendedAction:legalContent')}
            ticketEmail='researchlawyers@helsinki.fi'
          />
        </RecommendationDetails>
      </>
    ),
    permissive: (
      <>
        <RecommendationDetails
          title={t('services:bsdmitTitle')}
          content={t('services:bsdmitContent')}
        >
          <LinkWithQuery
            data-cy='disclosure-ext-button'
            to={t('services:disclosureExtLink')}
          >
            {t('services:disclosure')}
          </LinkWithQuery>
        </RecommendationDetails>

        <RecommendationDetails
          sx={{ mt: 4 }}
          title={t('services:openSourceLegalSuggestionTitle')}
          content=''
        >
          <SendContactTicket
            title={t('recommendedAction:legalTitle')}
            content={t('recommendedAction:legalContent')}
            ticketEmail='researchlawyers@helsinki.fi'
          />
        </RecommendationDetails>
      </>
    ),
  }

  // Get the corresponding components for the most recommended action from the components tree.
  const RecommendedActionElement = elements[action]

  if (!RecommendedActionElement) return null

  return (
    <Box
      id='recommended-action-component'
      style={{ marginTop: '2rem', marginBottom: '4rem' }}
    >
      {RecommendedActionElement}
    </Box>
  )
}

export default RecommendedAction
