import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useResults from '../../hooks/useResults'
import useRecommendations from '../../hooks/useRecommendations'

import CommonResult from '../InteractiveForm/CommonResult'
import Markdown from '../Common/Markdown'
import ResultContactSection from '../SendEmail/ResultContactSection'
import RecommendationChip from '../Chip/RecommendationChip'

import { IPAssessmentResult, InputProps, Locales } from '../../types'
import {
  getRecommendationScores,
  sortRecommendations,
} from '../../util/recommendations'
import styles from '../../styles'

const { cardStyles, resultStyles } = styles

const ResultElement = ({
  language,
  resultData,
}: {
  language: keyof Locales
  resultData: IPAssessmentResult
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
    </Container>
  )
}

const SectionResults = ({
  section,
  results,
}: {
  section: 'technical' | 'mathematical' | 'computerProgram'
  results: IPAssessmentResult[]
}) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n

  const isPotentiallyPatentable = results.every(
    (result) => result.data.potentiallyPatentable
  )

  if (!section || results.length === 0) return null

  return (
    <Box>
      <Typography variant='h6'>
        {t(`ipAssessmentSurvey:${section}Title`)}
      </Typography>
      {results.map((result) => (
        <ResultElement
          key={result.id}
          language={language as keyof Locales}
          resultData={result}
        />
      ))}

      <Box sx={cardStyles.card}>
        {isPotentiallyPatentable ? (
          <Markdown>{t(`ipAssessmentSurvey:${section}Patentable`)}</Markdown>
        ) : (
          <Markdown>{t(`ipAssessmentSurvey:${section}NotPatentable`)}</Markdown>
        )}
      </Box>
    </Box>
  )
}

const Results = ({ formResultData }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('ipAssessment')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const { language } = i18n

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
    !results ||
    !resultsFetched ||
    !formResultData ||
    !recommendations ||
    !recommendationsFetched
  )
    return null

  const recommendationScores = getRecommendationScores(
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
  ) as unknown as IPAssessmentResult[]

  const recommendationLabels = sortedRecommendations.map(
    (recommendation) => recommendation.label
  )

  const sortedResultsWithLabels = filteredResults
    .map((result) => ({
      ...result,
      labels: ['allDimensions', ...recommendationLabels],
    }))
    .sort((a, b) => a.id - b.id)

  const technicalResults = sortedResultsWithLabels.filter(
    (result: IPAssessmentResult) => result.data.type === 'technical'
  )

  const mathematicalResults = sortedResultsWithLabels.filter(
    (result: IPAssessmentResult) => result.data.type === 'mathematical'
  )

  const computerProgramResults = sortedResultsWithLabels.filter(
    (result: IPAssessmentResult) => result.data.type === 'computerProgram'
  )

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
                recommendation={recommendationLabels[0]}
              />
            )}
            <SectionResults section='technical' results={technicalResults} />

            <SectionResults
              section='mathematical'
              results={mathematicalResults}
            />

            <SectionResults
              section='computerProgram'
              results={computerProgramResults}
            />
          </Box>
        </Box>
        <ResultContactSection />
      </Box>
    </Box>
  )
}

export default Results
