import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useResults from '../../hooks/useResults'
import useRecommendations from '../../hooks/useRecommendations'

import Markdown from '../Common/Markdown'
import ResultButtons from '../ResultButtons/ResultButtons'

import colors from '../../util/colors'
import { getIeRecommendationScores, sortRecommendations } from './util'

import { InputProps, Locales } from '../../types'
import styles from '../../styles'
import RecommendationChip from '../Chip/RecommendationChip'

const { cardStyles, resultStyles } = styles

const ResultElement = ({
  language,
  resultData,
  dimensions,
}: {
  language: keyof Locales
  resultData: any
  dimensions: string[]
}) => {
  if (!resultData) return null

  return (
    <Container
      style={{
        margin: '2rem 0 2rem 0',
        borderLeft: 'solid',
        borderColor: '#9ca3af',
        borderWidth: '1px',
      }}
    >
      <Box style={{ margin: '2rem 0 2rem 1rem' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>

      <Box
        style={{
          margin: '2rem 0 2rem 0',
        }}
      >
        {dimensions.map((dimension: string) => {
          const color = colors[dimension] || null
          return (
            <Box
              data-cy={`result-wrapper-${resultData.optionLabel}-${dimension}`}
              key={`${JSON.stringify(resultData)}.${dimension}`}
              style={{
                margin: '1rem',
                padding: '0 2rem 0 2rem ',
                borderLeft: 'solid',
                borderColor: color,
                borderWidth: '6px',
              }}
            >
              <Markdown>{resultData.data[dimension][language]}</Markdown>
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

const Results = ({ formResultData }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const { survey } = useSurvey('ideaEvaluation')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess } = useRecommendations(survey?.id)

  const refCallback = useCallback((resultDOMElement: HTMLDivElement) => {
    if (!resultDOMElement) return

    sessionStorage.setItem(
      'ipsutin-session-resultHTML',
      resultDOMElement.innerHTML
    )
  }, [])

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
