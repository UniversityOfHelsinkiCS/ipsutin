import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { RecommendationLabel } from '@backend/types'

import Suggestion from './Suggestion'

import { SurveyName } from '../../types'

import styles from '../../styles'

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
    (surveyName === 'licenses' || surveyName === 'ipAssessment')
  )
    return null

  // After Idea Evaluation, propose linking to Patentability Evaluation as a possible
  // follow-up action when proposal is not to file invention disclosure
  if (action === 'disclosure' && surveyName === 'ideaEvaluation') return null

  const components: { [key in SurveyName]?: ReactElement } = {
    ideaEvaluation: (
      <Suggestion>
        <Link to='/ipassessment'>{t('surveyNames:ipAssessment')}</Link>
      </Suggestion>
    ),
    licenses: (
      <Suggestion>
        <Link to='/ideaevaluation'>{t('surveyNames:ideaEvaluation')}</Link>
      </Suggestion>
    ),
    ipAssessment: (
      <Suggestion>
        <Link to='/ideaevaluation'>{t('surveyNames:ideaEvaluation')}</Link>
      </Suggestion>
    ),
  }

  const ExtraActionComponent = components[surveyName]

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        data-cy='extra-action-section-title'
        variant='h6'
        sx={cardStyles.heading}
        component='div'
      >
        {t('extraAction:title')}
      </Typography>

      {ExtraActionComponent}
    </Box>
  )
}

export default ExtraAction
