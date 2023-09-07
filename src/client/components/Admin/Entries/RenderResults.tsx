import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Locales } from '@backend/types'
import { Box, Typography } from '@mui/material'

import useRecommendations from '../../../hooks/useRecommendations'
import useResults from '../../../hooks/useResults'
import useSurvey from '../../../hooks/useSurvey'
import styles from '../../../styles'
import { FormValues, SurveyName } from '../../../types'
import {
  getRecommendationLabels,
  getRecommendationScores,
  sortRecommendations,
} from '../../../util/recommendations'
import { getCommonResult, getResultsWithLabels } from '../../../util/results'
import RecommendationChip from '../../Chip/RecommendationChip'
import CommonResult from '../../InteractiveForm/CommonResult'
import DefaultResultElements from '../../InteractiveForm/DefaultResultElements'
import IpAssessmentResultElements from '../../InteractiveForm/IpAssessmentResultElements'

const { resultStyles } = styles

interface RenderResultsType {
  surveyName: SurveyName
  resultData: FormValues
}

const RenderResults = ({ surveyName, resultData }: RenderResultsType) => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey(surveyName)
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const { language } = i18n

  if (
    !resultsFetched ||
    !resultData ||
    !recommendationsFetched ||
    !recommendations ||
    !results
  )
    return null

  const commonResult = getCommonResult(results)

  const recommendationScores = getRecommendationScores(
    resultData,
    recommendations
  )

  const sortedRecommendations = sortRecommendations(
    recommendations,
    recommendationScores
  )

  const recommendationLabels = getRecommendationLabels(sortedRecommendations)

  const sortedResultsWithLabels = getResultsWithLabels(results, resultData, [
    'allDimensions',
    ...recommendationLabels,
  ])

  const recommendedAction = recommendationLabels[0]

  const resultComponents: { [key in SurveyName]: ReactElement } = {
    ipAssessment: (
      <IpAssessmentResultElements
        sortedResultsWithLabels={sortedResultsWithLabels}
      />
    ),
    licences: (
      <DefaultResultElements
        sortedResultsWithLabels={sortedResultsWithLabels}
      />
    ),
    ideaEvaluation: (
      <DefaultResultElements
        sortedResultsWithLabels={sortedResultsWithLabels}
      />
    ),
  }

  const ResultComponent = resultComponents[surveyName]

  if (!ResultComponent) return null

  return (
    <Box sx={resultStyles.resultSection}>
      <Typography
        data-cy='result-section-title'
        variant='h5'
        sx={resultStyles.heading}
        component='div'
      >
        {t('admin:entryViewTitle')}
      </Typography>

      {sortedRecommendations.map((recommendation) => (
        <RecommendationChip
          key={recommendation.id}
          recommendation={recommendation}
          compact={false}
        />
      ))}

      {commonResult && (
        <CommonResult
          key={commonResult.id}
          language={language as keyof Locales}
          resultData={commonResult}
          recommendation={recommendedAction}
        />
      )}

      {ResultComponent}
    </Box>
  )
}

export default RenderResults
