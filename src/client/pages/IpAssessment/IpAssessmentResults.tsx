import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Locales } from '@backend/types'
import { Box } from '@mui/material'

import ExtraAction from '../../components/Action/ExtraAction'
import ShareResult from '../../components/Action/ShareResult'
import RenderRecommendationChips from '../../components/Chip/RenderRecommendationChips'
import Markdown from '../../components/Common/Markdown'
import NavigateBack from '../../components/Common/NavigateBack'
import SectionHeading from '../../components/Common/SectionHeading'
import RecommendedAction from '../../components/Contact/RecommendedAction'
import CommonResult from '../../components/InteractiveForm/CommonResult'
import IpAssessmentResultElements from '../../components/InteractiveForm/IpAssessmentResultElements'
import { useResultData } from '../../components/InteractiveForm/ResultDataContext'
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

const { cardStyles } = styles

const IpAssessmentResults = () => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('ipAssessment')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const refCallback = useResultRefCallback()
  const { resultData } = useResultData()

  const { language } = i18n

  useEffect(() => {
    if (recommendationsFetched) {
      document
        ?.getElementById('ip-assessment-result-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recommendationsFetched])

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
    <Box
      id='ip-assessment-result-section'
      component='section'
      sx={{ ...cardStyles.outerBox, width: '1560px' }}
    >
      <SectionHeading
        data-cy='ip-assessment-result-section-title'
        level='h2'
        sx={{ mt: 4, ml: 4 }}
      >
        {t('results:title')}
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
        <SectionHeading level='h3'>
          {t('recommendedAction:title')}
        </SectionHeading>
        <CommonResult
          key={commonResult?.id}
          language={language as keyof Locales}
          resultData={commonResult}
          recommendation={recommendedAction}
        />
        <RecommendedAction action={recommendedAction} />

        <SectionHeading level='h3'>{t('results:subtitle')}</SectionHeading>
        <IpAssessmentResultElements
          sortedResultsWithLabels={sortedResultsWithLabels}
        />
      </Box>

      <NavigateBack />

      <Box sx={cardStyles.subHeading}>
        <ExtraAction action={recommendedAction} surveyName='ipAssessment' />
        <ShareResult surveyName={survey.name} />
      </Box>
    </Box>
  )
}

export default IpAssessmentResults
