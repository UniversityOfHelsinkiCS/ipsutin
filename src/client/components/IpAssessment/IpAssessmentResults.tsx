import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IPAssessmentResult, Locales } from '@backend/types'
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
import RecommendationChip from '../Chip/RecommendationChip'
import Markdown from '../Common/Markdown'
import NavigateBack from '../Common/NavigateBack'
import Contact from '../Contact/Contact'
import CommonResult from '../InteractiveForm/CommonResult'
import IpAssessmentResultElement from '../InteractiveForm/IpAssessmentResultElement'

import { useIpAssessmentResultData } from './IpAssessmentResultDataContext'

const { cardStyles, resultStyles } = styles

const IpAssessmentSectionResults = ({
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
        <IpAssessmentResultElement
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

  const refCallback = useResultRefCallback()
  const { resultData } = useIpAssessmentResultData()

  const { language } = i18n

  useEffect(() => {
    if (recommendationsFetched) {
      document
        ?.getElementById('ip-assessment-result-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recommendationsFetched])

  if (
    !results ||
    !resultsFetched ||
    !resultData ||
    !recommendations ||
    !recommendationsFetched
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

            <IpAssessmentSectionResults
              section='technical'
              results={technicalResults}
            />

            <IpAssessmentSectionResults
              section='mathematical'
              results={mathematicalResults}
            />

            <IpAssessmentSectionResults
              section='computerProgram'
              results={computerProgramResults}
            />
          </Box>
          <NavigateBack />
        </Box>
        <Box sx={cardStyles.subHeading}>
          <Contact action={recommendedAction} />
          <ExtraAction action={recommendedAction} surveyName='ipAssessment' />
          <ShareResult />
        </Box>
      </Box>
    </Box>
  )
}

export default IpAssessmentResults
