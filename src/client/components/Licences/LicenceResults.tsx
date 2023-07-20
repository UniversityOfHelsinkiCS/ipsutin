import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Locales, RecommendationLabel } from '@backend/types'
import { Box, Button, Container, Typography } from '@mui/material'

import useRecommendations from '../../hooks/useRecommendations'
import useResults from '../../hooks/useResults'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import {
  getRecommendationScores,
  sortRecommendations,
} from '../../util/recommendations'
import ExtraAction from '../Action/ExtraAction'
import ShareResult from '../Action/ShareResult'
import RecommendationChip from '../Chip/RecommendationChip'
import Contact from '../Contact/Contact'
import SendSummaryEmail from '../Contact/SendSummaryEmail'
import CommonResult from '../InteractiveForm/CommonResult'
import ResultElement from '../InteractiveForm/ResultElement'

import { useLicenceResultData } from './LicenceResultDataContext'

const { cardStyles, resultStyles } = styles

const LicenceResults = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { survey } = useSurvey('licenses')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const { resultData } = useLicenceResultData()

  const { language } = i18n

  useEffect(() => {
    if (recommendationsFetched) {
      document
        ?.getElementById('licences-result-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recommendationsFetched])

  const refCallback = useCallback((resultDOMElement: HTMLDivElement) => {
    if (!resultDOMElement) return

    sessionStorage.setItem(
      'ipsutin-session-resultHTML',
      resultDOMElement.innerHTML
    )
  }, [])

  if (
    !resultsFetched ||
    !resultData ||
    !recommendationsFetched ||
    !results ||
    !recommendations
  )
    return null

  const recommendationScores = getRecommendationScores(
    resultData,
    recommendations
  )

  const sortedRecommendations = sortRecommendations(
    recommendations,
    recommendationScores
  )

  const commonResult = results.find((result) => result.optionLabel === 'common')

  const filteredResults = results.filter((result) =>
    Object.values(resultData).includes(result.optionLabel)
  )

  const recommendationLabels = sortedRecommendations.map(
    (recommendation) => recommendation.label
  )

  const recommendedAction = recommendationLabels[0]

  const sortedResultsWithLabels = filteredResults
    .map((result) => ({
      ...result,
      labels: ['allDimensions', ...recommendationLabels],
    }))
    .sort((a, b) => a.id - b.id)

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
            <Box sx={{ mt: 2 }}>
              {sortedRecommendations.map((recommendation) => (
                <RecommendationChip
                  key={recommendation.id}
                  recommendation={recommendation}
                  compact={false}
                />
              ))}
            </Box>
          </Container>

          <Box ref={refCallback} sx={resultStyles.resultSection}>
            {commonResult && (
              <CommonResult
                key={commonResult.id}
                language={language as keyof Locales}
                resultData={commonResult}
                recommendation={recommendedAction}
              />
            )}
            {sortedResultsWithLabels.map((result) => (
              <ResultElement
                key={result.id}
                language={language as keyof Locales}
                resultData={result}
                dimensions={result.labels as RecommendationLabel[]}
              />
            ))}
          </Box>
          <Button
            data-cy='licences-back-to-selections-button'
            sx={{ m: 1 }}
            onClick={() => navigate('..')}
          >
            {'<'} {t('results:backToMessage')}
          </Button>
        </Box>
        <Box sx={cardStyles.subHeading}>
          <SendSummaryEmail />
          <Contact action={recommendedAction} />
          <ExtraAction action={recommendedAction} surveyName='licenses' />
          <ShareResult />
        </Box>
      </Box>
    </Box>
  )
}

export default LicenceResults
