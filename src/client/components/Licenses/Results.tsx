import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useResults from '../../hooks/useResults'
import useRecommendations from '../../hooks/useRecommendations'

import Markdown from '../Common/Markdown'
import ResultButtons from '../ResultButtons/ResultButtons'
import RecommendationChip from '../Chip/RecommendationChip'

import colors from '../../util/colors'
import styles from '../../styles'
import { InputProps, Locales, Result } from '../../types'

const { cardStyles, resultStyles } = styles

const ResultElement = ({
  language,
  resultData,
}: {
  language: keyof Locales
  resultData: Result
}) => {
  if (!resultData) return null

  const dimensions = ['allDimensions', 'clinic', 'legal', 'gnu_gpl', 'bsd_mit']

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
  const { survey } = useSurvey('licenses')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const { language } = i18n

  const refCallback = useCallback((resultDOMElement: HTMLDivElement) => {
    if (!resultDOMElement) return

    sessionStorage.setItem(
      'ipsutin-session-resultHTML',
      resultDOMElement.innerHTML
    )
  }, [])

  if (!resultsFetched || !formResultData || !recommendationsFetched) return null

  const resultArray = Object.values(formResultData).map((aChoice: string) => [
    aChoice,
  ])

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
              {recommendations.map((recommendation) => (
                <RecommendationChip
                  key={recommendation.id}
                  recommendation={recommendation}
                  compact={false}
                />
              ))}
            </Box>
          </Container>

          <Box ref={refCallback}>
            {resultArray.map((resultLabels) =>
              resultLabels.map((resultLabel) => (
                <ResultElement
                  key={JSON.stringify(resultLabel)}
                  language={language as keyof Locales}
                  resultData={results.find(
                    (result: { optionLabel: string }) =>
                      result.optionLabel === resultLabel
                  )}
                />
              ))
            )}
          </Box>
        </Box>
        <ResultButtons />
      </Box>
    </Box>
  )
}

export default Results
