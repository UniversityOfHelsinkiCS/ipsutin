import React from 'react'
import { Box, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styles from '../../styles'
import { FormValues, InputProps, Question } from '../../types'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import RenderQuestions from '../InteractiveForm/RenderQuestions'
import useResults from '../../hooks/useResults'
import Markdown from '../Common/Markdown'

const IpAssessment = ({ faculty }: InputProps) => {
  const { formStyles } = styles
  const { survey, isLoading } = useSurvey('ipAssessment')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)
  const { t, i18n } = useTranslation()

  const { language } = i18n

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }
    mutation.mutateAsync(submittedData)
  }

  if (isLoading || !resultsFetched) return null

  const technical = survey.Questions.filter((question) =>
    [101, 102, 103, 104].includes(question.id)
  )
  const mathematical = survey.Questions.filter((question) =>
    [105, 106, 107, 108, 109].includes(question.id)
  )
  const computerProgram = survey.Questions.filter((question) =>
    [110, 111, 112].includes(question.id)
  )

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

  const technicalAnswered = watch(
    technical.map((question) => question.id.toString())
  )
  const mathematicalAnswered = watch(
    mathematical.map((question) => question.id.toString())
  )
  const computerProgramAnswered = watch(
    computerProgram.map((question) => question.id.toString())
  )

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ paddingLeft: '10px' }}>
              {t('ipAssessmentSurvey:technicalTitle')}
            </h2>
            {technical.map((question: Question) => (
              <div key={question.id}>
                {question.parentId === null && (
                  <RenderQuestions
                    control={control}
                    watch={watch}
                    question={question}
                    questions={technical}
                    language={language}
                  />
                )}
              </div>
            ))}
            {!technicalAnswered.some((answer) => !answer) &&
              technicalAnswered.every((v: any) =>
                technicalResultSequence[0].includes(v)
              ) && <Markdown>{t('ipAssessmentSurvey:patentable')}</Markdown>}
            <h2 style={{ paddingLeft: '10px' }}>
              {t('ipAssessmentSurvey:mathematicalTitle')}
            </h2>
            {mathematical.map((question: Question) => (
              <div key={question.id}>
                {question.parentId === null && (
                  <RenderQuestions
                    control={control}
                    watch={watch}
                    question={question}
                    questions={mathematical}
                    language={language}
                  />
                )}
              </div>
            ))}
            {!mathematicalAnswered.some((answer) => !answer) &&
              mathematicalAnswered.every((v: any) =>
                mathematicalResultSequence[0].includes(v)
              ) && <Markdown>{t('ipAssessmentSurvey:patentable')}</Markdown>}
            <h2 style={{ paddingLeft: '10px' }}>
              {t('ipAssessmentSurvey:computerProgramTitle')}
            </h2>
            {computerProgram.map((question: Question) => (
              <div key={question.id}>
                {question.parentId === null && (
                  <RenderQuestions
                    control={control}
                    watch={watch}
                    question={question}
                    questions={computerProgram}
                    language={language}
                  />
                )}
              </div>
            ))}
            {!computerProgramAnswered.some((answer) => !answer) &&
              computerProgramAnswered.every((v: any) =>
                computerProgramResultSequence[0].includes(v)
              ) && <Markdown>{t('ipAssessmentSurvey:patentable')}</Markdown>}
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default IpAssessment
