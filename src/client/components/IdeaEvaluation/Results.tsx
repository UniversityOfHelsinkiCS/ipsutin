import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useResults from '../../hooks/useResults'
import styles from '../../styles'
import { InputProps, Locales } from '../../types'
import { getIeRecommendationScores, sortRecommendations } from './util'
import useRecommendations from '../../hooks/useRecommendations'
import ResultButtons from '../ResultButtons/ResultButtons'

const { cardStyles, resultStyles } = styles

const Results = ({ formResultData, watch }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const { survey } = useSurvey('ideaEvaluation')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess } = useRecommendations(survey?.id)

  if (!resultsFetched || !formResultData || !isSuccess) return null

  const recommendationScores = getIeRecommendationScores(
    formResultData,
    recommendations
  )
  const sortedRecommendations = sortRecommendations(
    recommendations,
    recommendationScores
  )

  const filteredResults = results.filter((result) =>
    Object.values(formResultData).includes(result.optionLabel)
  )

  const sortedRecommendationLabels = sortedRecommendations.map(
    (recommendation) => recommendation.label
  )

  const filteredResultsWithLabels = filteredResults.map((result) => ({
    ...result,
    labels: sortedRecommendationLabels,
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
          </Container>

          <Box>
            {filteredResultsWithLabels.map((result) => (
              <div key={result.id}>
                <Box sx={cardStyles.outerBox}>
                  {result.isSelected[language as keyof Locales]}
                </Box>
                {result.labels.map((label) =>
                  result.data[label][language as keyof Locales] ? (
                    <Box key={label}>
                      {
                        sortedRecommendations.find(
                          (recommendation) => recommendation.label === label
                        ).title[language as keyof Locales]
                      }
                      : {result.data[label][language as keyof Locales]}
                    </Box>
                  ) : null
                )}
              </div>
            ))}
          </Box>
        </Box>
      </Box>
      <ResultButtons watch={watch} />
    </Box>
  )
}

export default Results
