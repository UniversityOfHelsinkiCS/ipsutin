import { useTranslation } from 'react-i18next'
import { Locales, SurveyName } from '@backend/types'
import { Box } from '@mui/material'

import useRecommendations from '../../hooks/useRecommendations'
import useResultRefCallback from '../../hooks/useResultRefCallback'
import useResults from '../../hooks/useResults'
import useSurvey from '../../hooks/useSurvey'
import {
  getRecommendationLabels,
  getRecommendationScores,
  sortRecommendations,
} from '../../util/recommendations'
import {
  getCommonResult,
  getResultsWithLabels,
  ResultWithLabels,
} from '../../util/results'
import ProductSuggestion from '../Action/ProductSuggestion'
import ShareResult from '../Action/ShareResult'
import RenderRecommendationChips from '../Chip/RenderRecommendationChips'
import Markdown from '../Common/Markdown'
import NavigateBack from '../Common/NavigateBack'
import SectionHeading from '../Common/SectionHeading'
import RecommendedAction from '../Contact/RecommendedAction'

import CommonResult from './CommonResult'
import { useResultData } from './ResultDataContext'

type ResultsPageProps = {
  surveyName: SurveyName
  ResultElements: React.JSXElementConstructor<{
    sortedResultsWithLabels: ResultWithLabels
  }>
}

const ResultsPage = ({ surveyName, ResultElements }: ResultsPageProps) => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey(surveyName)

  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const refCallback = useResultRefCallback()
  const { resultData } = useResultData()

  const { language } = i18n

  if (
    !survey ||
    !results ||
    !resultsFetched ||
    !resultData ||
    !recommendations ||
    !recommendationsFetched
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

  return (
    <Box component='section' sx={{ width: '1560px' }}>
      <SectionHeading
        data-cy={`${surveyName}-result-section-title`}
        level='h1'
        sx={{ mt: 4, ml: 4 }}
      >
        {t('results:title', { name: t(`surveyNames:${surveyName}`) })}
      </SectionHeading>

      <RenderRecommendationChips recommendations={sortedRecommendations} />

      {commonResult && commonResult?.isSelected[language as keyof Locales] && (
        <Box component='section' style={{ margin: '1rem 2rem' }}>
          <Markdown>
            {commonResult.isSelected[language as keyof Locales]}
          </Markdown>
        </Box>
      )}

      <Box
        component='section'
        ref={refCallback}
        style={{ marginLeft: '2rem', marginTop: '4rem' }}
      >
        <SectionHeading level='h2'>
          {t('recommendedAction:title')}
        </SectionHeading>
        <CommonResult
          key={commonResult?.id}
          language={language as keyof Locales}
          resultData={commonResult}
          recommendation={recommendedAction}
        />
        <RecommendedAction action={recommendedAction} />

        <SectionHeading level='h2'>{t('results:subtitle')}</SectionHeading>
        <ResultElements sortedResultsWithLabels={sortedResultsWithLabels} />
      </Box>

      <NavigateBack />

      <Box component='section' sx={{ m: 4 }}>
        <ProductSuggestion
          suggestedProduct={recommendedAction}
          surveyName={surveyName}
        />
        <ShareResult surveyName={surveyName} />
      </Box>
    </Box>
  )
}

export default ResultsPage
