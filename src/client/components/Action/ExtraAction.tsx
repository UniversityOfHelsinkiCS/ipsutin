import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { RecommendationLabel, SurveyName } from '@backend/types'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import LinkWithQuery from '../Common/LinkWithQuery'

import Suggestion from './Suggestion'

interface ExtraActionProps {
  action: RecommendationLabel
  surveyName: SurveyName
}

const { cardStyles } = styles

const ExtraAction = ({ action, surveyName }: ExtraActionProps) => {
  const { t } = useTranslation()

  if (!action || !surveyName) return null

  // After Software Licensing and Patentability Evaluation,
  // recommend Idea Evaluation when action is not to book Idea Clinic.
  if (
    action === 'clinic' &&
    (surveyName === 'licences' || surveyName === 'ipAssessment')
  )
    return null

  // After Idea Evaluation, propose linking to Patentability Evaluation as a possible
  // follow-up action when proposal is not to file invention disclosure
  if (action === 'disclosure' && surveyName === 'ideaEvaluation') return null

  const components: { [key in SurveyName]?: ReactElement } = {
    ideaEvaluation: (
      <Suggestion>
        <LinkWithQuery
          data-cy='suggestion-to-ipassessment-button'
          to='/ipassessment'
        >
          {t('surveyNames:ipAssessment')}
        </LinkWithQuery>
      </Suggestion>
    ),
    licences: (
      <Suggestion>
        <LinkWithQuery
          data-cy='suggestion-to-ideaevaluation-button'
          to='/ideaevaluation'
        >
          {t('surveyNames:ideaEvaluation')}
        </LinkWithQuery>
      </Suggestion>
    ),
    ipAssessment: (
      <Suggestion>
        <LinkWithQuery
          data-cy='suggestion-to-ideaevaluation-button'
          to='/ideaevaluation'
        >
          {t('surveyNames:ideaEvaluation')}
        </LinkWithQuery>
      </Suggestion>
    ),
  }

  const ExtraActionComponent = components[surveyName]

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant='h6' sx={cardStyles.heading} component='div'>
        {t('extraAction:title')}
      </Typography>

      {ExtraActionComponent}
    </Box>
  )
}

export default ExtraAction
