import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Locales } from '@backend/types'
import { Box, Typography } from '@mui/material'

import useRecommendations from '../../hooks/useRecommendations'
import useResultRefCallback from '../../hooks/useResultRefCallback'
import useResults from '../../hooks/useResults'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import {
  getRecommendationLabels,
  getRecommendationScores,
  sortRecommendations,
} from '../../util/recommendations'
import { getCommonResult, getResultsWithLabels } from '../../util/results'
import ExtraAction from '../Action/ExtraAction'
import ShareResult from '../Action/ShareResult'
import RenderRecommendationChips from '../Chip/RenderRecommendationChips'
import Markdown from '../Common/Markdown'
import NavigateBack from '../Common/NavigateBack'
import RecommendedAction from '../Contact/RecommendedAction'
import CommonResult from '../InteractiveForm/CommonResult'
import DefaultResultElements from '../InteractiveForm/DefaultResultElements'

import { useIdeaEvaluationResultData } from './IdeaEvaluationResultContext'

const { cardStyles, resultStyles } = styles

const IdeaEvaluationResults = () => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('ideaEvaluation')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const refCallback = useResultRefCallback()
  const { resultData } = useIdeaEvaluationResultData()

  const { language } = i18n

  useEffect(() => {
    if (recommendationsFetched) {
      document
        ?.getElementById('idea-evaluation-result-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recommendationsFetched])

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

  const sortedResultsWithLabels = getResultsWithLabels(
    results,
    resultData,
    recommendationLabels
  )

  const recommendedAction = recommendationLabels[0]

  return (
    <Box id='idea-evaluation-result-section' sx={cardStyles.outerBox}>
      <Typography
        data-cy='idea-evaluation-result-section-title'
        variant='h5'
        sx={resultStyles.heading}
        component='div'
      >
        {t('results:title')}
      </Typography>

      <RenderRecommendationChips recommendations={sortedRecommendations} />

      {commonResult && (
        <Box style={{ margin: '1rem 2rem' }}>
          <Markdown>
            {commonResult.isSelected[language as keyof Locales]}
          </Markdown>
        </Box>
      )}

      <Box ref={refCallback} style={{ marginLeft: '2rem', marginTop: '4rem' }}>
        <Typography
          variant='h6'
          style={{
            fontWeight: '200',
            textAlign: 'left',
            marginBottom: '1rem',
          }}
          component='div'
        >
          {t('recommendedAction:title')}
        </Typography>
        <CommonResult
          key={commonResult?.id}
          language={language as keyof Locales}
          resultData={commonResult}
          recommendation={recommendedAction}
        />
        <RecommendedAction action={recommendedAction} />

        <Typography
          variant='h6'
          style={{
            fontWeight: '200',
            textAlign: 'left',
            marginBottom: '1rem',
          }}
          component='div'
        >
          {t('results:subtitle')}
        </Typography>
        <DefaultResultElements
          sortedResultsWithLabels={sortedResultsWithLabels}
        />
      </Box>

      <NavigateBack />
      <Box sx={cardStyles.subHeading}>
        <ExtraAction action={recommendedAction} surveyName='ideaEvaluation' />
        <ShareResult />
      </Box>
    </Box>
  )
}

export default IdeaEvaluationResults
