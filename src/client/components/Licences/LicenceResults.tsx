import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Locales } from '@backend/types'
import { Box, Container, Typography } from '@mui/material'

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
import NavigateBack from '../Common/NavigateBack'
import RecommendedAction from '../Contact/RecommendedAction'
import CommonResult from '../InteractiveForm/CommonResult'
import DefaultResultElements from '../InteractiveForm/DefaultResultElements'

import { useLicenceResultData } from './LicenceResultDataContext'

const { cardStyles, resultStyles } = styles

const LicenceResults = () => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('licences')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const refCallback = useResultRefCallback()
  const { resultData } = useLicenceResultData()

  const { language } = i18n

  useEffect(() => {
    if (recommendationsFetched) {
      document
        ?.getElementById('licences-result-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recommendationsFetched])

  if (
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
    <Box id='licences-result-section'>
      <Box sx={cardStyles.outerBox}>
        <Box sx={resultStyles.resultWrapper}>
          <Container sx={{ mt: 4 }}>
            <Typography
              data-cy='licences-result-section-title'
              variant='h5'
              sx={resultStyles.heading}
              component='div'
            >
              {t('results:title')}
            </Typography>

            <RenderRecommendationChips
              recommendations={sortedRecommendations}
            />
          </Container>

          <Box ref={refCallback} sx={resultStyles.resultSection}>
            <Typography variant='h6' sx={cardStyles.heading} component='div'>
              {t('contact:title')}
            </Typography>
            <CommonResult
              key={commonResult?.id}
              language={language as keyof Locales}
              resultData={commonResult}
              recommendation={recommendedAction}
            />
            <RecommendedAction action={recommendedAction} />

            <Typography variant='h6' sx={cardStyles.heading} component='div'>
              {t('contact:title')}
            </Typography>
            <DefaultResultElements
              sortedResultsWithLabels={sortedResultsWithLabels}
            />
          </Box>

          <NavigateBack />
        </Box>
        <Box sx={cardStyles.subHeading}>
          <ExtraAction action={recommendedAction} surveyName='licences' />
          <ShareResult />
        </Box>
      </Box>
    </Box>
  )
}

export default LicenceResults
