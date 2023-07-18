import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'

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
        <Button
          data-cy='suggestion-to-ipassessment-button'
          variant='contained'
          component={Link}
          to='/ipassessment'
        >
          {t('surveyNames:ipAssessment')}
        </Button>
      </Suggestion>
    ),
    licenses: (
      <Suggestion>
        <Button
          data-cy='suggestion-to-ideaevaluation-button'
          variant='contained'
          component={Link}
          to='/ideaevaluation'
        >
          {t('surveyNames:ideaEvaluation')}
        </Button>
      </Suggestion>
    ),
    ipAssessment: (
      <Suggestion>
        <Button
          data-cy='suggestion-to-ideaevaluation-button'
          variant='contained'
          component={Link}
          to='/ideaevaluation'
        >
          {t('surveyNames:ideaEvaluation')}
        </Button>
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
