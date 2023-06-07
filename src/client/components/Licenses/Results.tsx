import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useResults from '../../hooks/useResults'
import useRecommendations from '../../hooks/useRecommendations'

import ResultButtons from '../ResultButtons/ResultButtons'
import ResultElement from '../InteractiveForm/ResultElement'
import RecommendationChip from '../Chip/RecommendationChip'

import styles from '../../styles'
import { InputProps, Locales } from '../../types'

const { cardStyles, resultStyles } = styles

const Results = ({ formResultData }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('licenses')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const { language } = i18n

  const dimensions = ['allDimensions', 'clinic', 'legal', 'gnu_gpl', 'bsd_mit']

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

  if (
    !resultsFetched ||
    !formResultData ||
    !recommendationsFetched ||
    !results ||
    !recommendations
  )
    return null

  const commonResult = results.find((result) => result.optionLabel === 'common')

  const resultArray = Object.values(formResultData).map((aChoice: string) => [
    aChoice,
  ])

  return (
    <Box>
      <Box sx={cardStyles.outerBox}>
        <Box sx={resultStyles.resultWrapper}>
          <Container sx={{ mt: 4 }}>
            <Typography
              data-cy='result-section-title'
              variant='h5'
              sx={resultStyles.heading}
              component='div'
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
            {commonResult && (
              <ResultElement
                key={commonResult.id}
                language={language as keyof Locales}
                resultData={commonResult}
                dimensions={dimensions}
              />
            )}
          </Container>

          <Box ref={refCallback} sx={resultStyles.resultSection}>
            {resultArray.map((resultLabels) =>
              resultLabels.map((resultLabel) => (
                <ResultElement
                  key={JSON.stringify(resultLabel)}
                  language={language as keyof Locales}
                  resultData={results.find(
                    (result: { optionLabel: string }) =>
                      result.optionLabel === resultLabel
                  )}
                  dimensions={dimensions}
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
