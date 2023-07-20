import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IPAssessmentResult, Locales } from '@backend/types'
import { Box, Container, Typography } from '@mui/material'

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
import Markdown from '../Common/Markdown'
import NavigateBack from '../Common/NavigateBack'
import Contact from '../Contact/Contact'
import SendSummaryEmail from '../Contact/SendSummaryEmail'
import CommonResult from '../InteractiveForm/CommonResult'

import { useIpAssessmentResultData } from './IpAssessmentResultDataContext'

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
      <Typography
        data-cy={`ip-assessment-${section}-result-title`}
        variant='h6'
        sx={resultStyles.heading}
        component='div'
      >
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

const IpAssessmentResults = () => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('ipAssessment')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { recommendations, isSuccess: recommendationsFetched } =
    useRecommendations(survey?.id)

  const { resultData } = useIpAssessmentResultData()

  const { language } = i18n

  useEffect(() => {
    if (recommendationsFetched) {
      document
        ?.getElementById('ip-assessment-result-section')
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
    !results ||
    !resultsFetched ||
    !resultData ||
    !recommendations ||
    !recommendationsFetched
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

  const recommendedAction = recommendationLabels[0]

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
    <Box id='ip-assessment-result-section'>
      <Box sx={cardStyles.outerBox}>
        <Box sx={resultStyles.resultWrapper}>
          <Container sx={{ mt: 4 }}>
            <Typography
              data-cy='ip-assessment-result-section-title'
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
          <NavigateBack />
        </Box>
        <Box sx={cardStyles.subHeading}>
          <SendSummaryEmail />
          <Contact action={recommendedAction} />
          <ExtraAction action={recommendedAction} surveyName='ipAssessment' />
          <ShareResult />
        </Box>
      </Box>
    </Box>
  )
}

export default IpAssessmentResults
