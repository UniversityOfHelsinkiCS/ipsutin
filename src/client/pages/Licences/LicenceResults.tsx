import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Locales } from '@backend/types'
import { Box, Typography } from '@mui/material'

import ExtraAction from '../../components/Action/ExtraAction'
import ShareResult from '../../components/Action/ShareResult'
import RenderRecommendationChips from '../../components/Chip/RenderRecommendationChips'
import Markdown from '../../components/Common/Markdown'
import NavigateBack from '../../components/Common/NavigateBack'
import RecommendedAction from '../../components/Contact/RecommendedAction'
import CommonResult from '../../components/InteractiveForm/CommonResult'
import DefaultResultElements from '../../components/InteractiveForm/DefaultResultElements'
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

const { cardStyles, resultStyles } = styles

const LicenceResults = () => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('licences')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const refCallback = useResultRefCallback()
  const { resultData } = useResultData()

  const { language } = i18n

  useEffect(() => {
    if (recommendationsFetched) {
      document
        ?.getElementById('licences-result-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recommendationsFetched])

  if (
    !survey ||
    !resultsFetched ||
    !resultData ||
    !recommendationsFetched ||
    !results ||
    !recommendations
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
      id='licences-result-section'
      sx={{ ...cardStyles.outerBox, width: '2000px' }}
    >
      <Typography
        data-cy='licences-result-section-title'
        variant='h5'
        sx={resultStyles.heading}
        component='h2'
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
          component='h3'
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
          component='h3'
        >
          {t('results:subtitle')}
        </Typography>
        <DefaultResultElements
          sortedResultsWithLabels={sortedResultsWithLabels}
        />
      </Box>

      <NavigateBack />

      <Box sx={cardStyles.subHeading}>
        <ExtraAction action={recommendedAction} surveyName='licences' />
        <ShareResult surveyName={survey.name} />
      </Box>
    </Box>
  )
}

export default LicenceResults
