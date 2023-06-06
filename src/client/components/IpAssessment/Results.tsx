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
  results,
  answers,
}: {
  results: Result[]
  answers: string[]
}) => {
  const { i18n } = useTranslation()
  const { language } = i18n

  return (
    <Box>
      {answers.map((resultLabel) => (
        <ResultElement
          key={JSON.stringify(resultLabel)}
          language={language as keyof Locales}
          resultData={results.find(
            (result: { optionLabel: string }) =>
              result.optionLabel === resultLabel
          )}
        />
      ))}
    </Box>
  )
}

const Results = ({ survey, formResultData }: InputProps) => {
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { t } = useTranslation()

  if (!resultsFetched || !formResultData) return null

  const technicalResultSequence = results
    .filter(
      (result: { optionLabel: string }) => result.optionLabel === 'technical'
    )
    .map((result: { data: any }) => result.data.sequence)

  const mathematicalResultSequence = results
    .filter(
      (result: { optionLabel: string }) => result.optionLabel === 'mathematical'
    )
    .map((result: { data: any }) => result.data.sequence)

  const computerProgramResultSequence = results
    .filter(
      (result: { optionLabel: string }) =>
        result.optionLabel === 'computerProgram'
    )
    .map((result: { data: any }) => result.data.sequence)

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

          <h3>{t('ipAssessmentSurvey:technicalTitle')}</h3>
          <SectionResults results={results} answers={technicalAnswered} />

          <Box sx={cardStyles.card}>
            {technicalAnswered.some(
              (answer: any) => !answer
            ) ? null : technicalAnswered.every((v: any) =>
                technicalResultSequence[0].includes(v)
              ) ? (
              <Markdown>{t('ipAssessmentSurvey:technicalPatentable')}</Markdown>
            ) : (
              <Markdown>
                {t('ipAssessmentSurvey:technicalNotPatentable')}
              </Markdown>
            )}
          </Box>

          <h3>{t('ipAssessmentSurvey:mathematicalTitle')}</h3>
          <SectionResults results={results} answers={mathematicalAnswered} />

          <Box sx={cardStyles.card}>
            {mathematicalAnswered.some(
              (answer: any) => !answer
            ) ? null : mathematicalAnswered.every((v: any) =>
                mathematicalResultSequence[0].includes(v)
              ) ? (
              <Markdown>
                {t('ipAssessmentSurvey:mathemathicalPatentable')}
              </Markdown>
            ) : (
              <Markdown>
                {t('ipAssessmentSurvey:mathemathicalNotPatentable')}
              </Markdown>
            )}
          </Box>

          <h3>{t('ipAssessmentSurvey:computerProgramTitle')}</h3>
          <SectionResults results={results} answers={computerProgramAnswered} />

          <Box sx={cardStyles.card}>
            {computerProgramAnswered.some(
              (answer: any) => !answer
            ) ? null : Object.values(computerProgramAnswered).every((v: any) =>
                computerProgramResultSequence[0].includes(v)
              ) ? (
              <Markdown>
                {t('ipAssessmentSurvey:computerProgramPatentable')}
              </Markdown>
            ) : (
              <Markdown>
                {t('ipAssessmentSurvey:computerProgramNotPatentable')}
              </Markdown>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Results
