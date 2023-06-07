import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useResults from '../../hooks/useResults'
import useRecommendations from '../../hooks/useRecommendations'

import ResultButtons from '../ResultButtons/ResultButtons'
import ResultElement from '../InteractiveForm/ResultElement'
import RecommendationChip from '../Chip/RecommendationChip'

import { getIeRecommendationScores, sortRecommendations } from './util'
import { InputProps, Locales } from '../../types'
import styles from '../../styles'

const { cardStyles, resultStyles } = styles

const Results = ({ formResultData }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const { survey } = useSurvey('ideaEvaluation')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess } = useRecommendations(survey?.id)

  const refCallback = useCallback(
    (resultDOMElement: HTMLDivElement) => {
      if (!resultDOMElement) return

      sessionStorage.setItem(
        'ipsutin-session-resultHTML',
        resultDOMElement.innerHTML
      )
    },
    [formResultData]
  )

  if (!resultsFetched || !formResultData || !isSuccess) return null

  const recommendationScores = getIeRecommendationScores(
    formResultData,
    recommendations
  )

  const sortedRecommendations = sortRecommendations(
    recommendations,
    recommendationScores
  )

  const commonResult = results.find((result) => result.optionLabel === 'common')

  const filteredResults = results.filter((result) =>
    Object.values(formResultData).includes(result.optionLabel)
  )

  const recommendationLabels = sortedRecommendations.map(
    (recommendation) => recommendation.label
  )

  const filteredResultsWithLabels = filteredResults.map((result) => ({
    ...result,
    labels: recommendationLabels,
  }))

  return (
    <Box>
      <Box sx={cardStyles.outerBox}>
        <Box sx={resultStyles.resultWrapper}>
          <Container sx={{ mt: 4 }}>
            <Typography
              data-cy="result-section-title"
              variant="h5"
              sx={resultStyles.heading}
              component="div"
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
            <ResultElement
              key={commonResult.id}
              language={language as keyof Locales}
              resultData={commonResult}
              dimensions={recommendationLabels}
            />
          </Container>

          <Box ref={refCallback} sx={resultStyles.resultSection}>
            {filteredResultsWithLabels.map((result) => (
              <ResultElement
                key={result.id}
                language={language as keyof Locales}
                resultData={result}
                dimensions={result.labels}
              />
            ))}
          </Box>
        </Box>
        <ResultButtons />
      </Box>
    </Box>
  )
}

export default Results
