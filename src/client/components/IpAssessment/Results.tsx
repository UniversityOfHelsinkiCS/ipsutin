/* eslint-disable no-nested-ternary */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { InputProps } from '../../types'
import useResults from '../../hooks/useResults'
import Markdown from '../Common/Markdown'
import styles from '../../styles'
import getQuestionsAndLabels from '../../util/getQuestionsAndLabels'

const Results = ({ survey, formResultData }: InputProps) => {
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { t } = useTranslation()
  const { cardStyles } = styles

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

  const questionsAndLabels = getQuestionsAndLabels({ formResultData })
  const resultString = Object.keys(questionsAndLabels)
    .map(
      (answer, index) =>
        `${answer}: ${Object.values(questionsAndLabels)[index]}\n\n`
    )
    .join('')

  return (
    <Box sx={cardStyles.outerBox}>
      <h2>{t('results:title')}</h2>
      <Box sx={cardStyles.card}>
        <Markdown>{resultString}</Markdown>
      </Box>
      <h3>{t('ipAssessmentSurvey:technicalTitle')}</h3>
      <Box sx={cardStyles.card}>
        {technicalAnswered.some(
          (answer: any) => !answer
        ) ? null : technicalAnswered.every((v: any) =>
            technicalResultSequence[0].includes(v)
          ) ? (
          <Markdown>{t('ipAssessmentSurvey:patentable')}</Markdown>
        ) : (
          <Markdown>{t('ipAssessmentSurvey:notPatentable')}</Markdown>
        )}
      </Box>
      <h3>{t('ipAssessmentSurvey:mathematicalTitle')}</h3>
      <Box sx={cardStyles.card}>
        {mathematicalAnswered.some(
          (answer: any) => !answer
        ) ? null : mathematicalAnswered.every((v: any) =>
            mathematicalResultSequence[0].includes(v)
          ) ? (
          <Markdown>{t('ipAssessmentSurvey:patentable')}</Markdown>
        ) : (
          <Markdown>{t('ipAssessmentSurvey:notPatentable')}</Markdown>
        )}
      </Box>
      <h3>{t('ipAssessmentSurvey:computerProgramTitle')}</h3>
      <Box sx={cardStyles.card}>
        {computerProgramAnswered.some(
          (answer: any) => !answer
        ) ? null : Object.values(computerProgramAnswered).every((v: any) =>
            computerProgramResultSequence[0].includes(v)
          ) ? (
          <Markdown>{t('ipAssessmentSurvey:patentable')}</Markdown>
        ) : (
          <Markdown>{t('ipAssessmentSurvey:notPatentable')}</Markdown>
        )}
      </Box>
    </Box>
  )
}

export default Results
