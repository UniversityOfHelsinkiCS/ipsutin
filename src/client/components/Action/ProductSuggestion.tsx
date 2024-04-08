import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { RecommendationLabel, SurveyName } from '@backend/types'
import { Box } from '@mui/material'

import LinkWithQuery from '../Common/LinkWithQuery'
import SectionHeading from '../Common/SectionHeading'

import Suggestion from './Suggestion'

interface ProductSuggestionProps {
  suggestedProduct: RecommendationLabel
  surveyName: SurveyName
}

const ProductSuggestion = ({
  suggestedProduct,
  surveyName,
}: ProductSuggestionProps) => {
  const { t } = useTranslation()

  if (!suggestedProduct || !surveyName) return null

  // After Software Licensing and Patentability Evaluation,
  // recommend Idea Evaluation when action is not to book Idea Clinic.
  if (
    suggestedProduct === 'clinic' &&
    (surveyName === 'licences' || surveyName === 'ipAssessment')
  )
    return null

  // After Idea Evaluation, propose linking to Patentability Evaluation as a possible
  // follow-up action when proposal is not to file invention disclosure
  if (suggestedProduct === 'disclosure' && surveyName === 'ideaEvaluation')
    return null

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

  const SuggestionComponent = components[surveyName]

  return (
    <Box sx={{ mt: 8 }}>
      <SectionHeading level='h2'>{t('extraAction:title')}</SectionHeading>

      {SuggestionComponent}
    </Box>
  )
}

export default ProductSuggestion
