/* eslint-disable no-nested-ternary */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useResults from '../../hooks/useResults'

import Markdown from '../Common/Markdown'

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
        <Box
          key={`${JSON.stringify(resultData)}`}
          style={{
            margin: '1rem',
            padding: '0 2rem 0 2rem ',
            borderLeft: 'solid',
            borderWidth: '6px',
          }}
        >
          <Markdown>{resultData.data[language]}</Markdown>
        </Box>
      </Box>
    </Container>
  )
}

const SectionResults = ({
  section,
  results,
  answers,
}: {
  section: 'technical' | 'mathematical' | 'computerProgram'
  results: Result[]
  answers: string[]
}) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n

  // Strip the array of null values
  const filteredAnswers = answers.filter((value) => value)

  const sequence = results
    .filter((result: { optionLabel: string }) => result.optionLabel === section)
    .map((result: { data: any }) => result.data?.sequence)

  if (filteredAnswers.length === 0 || !section || !results || !sequence)
    return null

  return (
    <Box>
      <Typography>{t(`ipAssessmentSurvey:${section}Title`)}</Typography>
      <Box>
        {filteredAnswers.map((resultLabel) => (
          <ResultElement
            key={`${section}-${resultLabel}`}
            language={language as keyof Locales}
            resultData={results.find(
              (result: { optionLabel: string }) =>
                result.optionLabel === resultLabel
            )}
          />
        ))}
      </Box>

      <Box sx={cardStyles.card}>
        {filteredAnswers.some(
          (answer: string) => !answer
        ) ? null : filteredAnswers.every((aAnswer) =>
            sequence[0].includes(aAnswer)
          ) ? (
          <Markdown>{t(`ipAssessmentSurvey:${section}Patentable`)}</Markdown>
        ) : (
          <Markdown>{t(`ipAssessmentSurvey:${section}NotPatentable`)}</Markdown>
        )}
      </Box>
    </Box>
  )
}

const Results = ({ survey, formResultData }: InputProps) => {
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { t } = useTranslation()

  if (!resultsFetched || !formResultData) return null

  const technicalAnswered = Object.values(
    Object.fromEntries(
      Object.entries(formResultData).filter(([key]) =>
        ['101', '102', '103', '104'].includes(key)
      )
    )
  )

  const mathematicalAnswered = Object.values(
    Object.fromEntries(
      Object.entries(formResultData).filter(([key]) =>
        ['105', '106', '107', '108', '109'].includes(key)
      )
    )
  )

  const computerProgramAnswered = Object.values(
    Object.fromEntries(
      Object.entries(formResultData).filter(([key]) =>
        ['110', '111', '112'].includes(key)
      )
    )
  )

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

          <SectionResults
            section="technical"
            results={results}
            answers={technicalAnswered}
          />

          <SectionResults
            section="mathematical"
            results={results}
            answers={mathematicalAnswered}
          />

          <SectionResults
            section="computerProgram"
            results={results}
            answers={computerProgramAnswered}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Results
