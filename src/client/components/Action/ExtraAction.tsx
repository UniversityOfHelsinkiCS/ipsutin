import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { SurveyName } from '../../types'

import styles from '../../styles'
import Suggestion from './Suggestion'

interface ExtraActionProps {
  surveyName: SurveyName
}

const { cardStyles } = styles

const ExtraAction = ({ surveyName }: ExtraActionProps) => {
  const { t } = useTranslation()

  const components: { [key in SurveyName]?: ReactElement } = {
    ideaEvaluation: (
      <Suggestion
        title={t('extraAction:ideaEvaluationSuggestionTitle')}
        content={t('extraAction:ideaEvaluationSuggestionContent')}
      >
        <Link to='/ipassessment'>{t('surveyNames:ipAssessment')}</Link>
      </Suggestion>
    ),
  }

  const ExtraActionComponent = components[surveyName]

  if (!ExtraActionComponent) return null

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
