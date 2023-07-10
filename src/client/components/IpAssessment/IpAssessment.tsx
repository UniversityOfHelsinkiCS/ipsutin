import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Box, Button, Grid, Stack, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'

import Results from './Results'
import ResetForm from '../Common/ResetForm'
import RenderQuestions from '../InteractiveForm/RenderQuestions'

import styles from '../../styles'
import { FormValues, InputProps, Question } from '../../types'

const IpAssessment = ({ faculty }: InputProps) => {
  const [resultData, setResultData] = useState<FormValues>(null)
  const [showResults, setShowResults] = useState(false)
  const { formStyles, cardStyles } = styles
  const { survey, isLoading } = useSurvey('ipAssessment')
  const { t, i18n } = useTranslation()

  const { language } = i18n

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }
    setResultData(data)
    mutation.mutateAsync(submittedData)
    setShowResults(true)
  }

  if (isLoading) return null

  const technical = survey.Questions.filter((question) =>
    [101, 102, 103, 104].includes(question.id)
  )
  const mathematical = survey.Questions.filter((question) =>
    [105, 106, 107, 108, 109].includes(question.id)
  )
  const computerProgram = survey.Questions.filter((question) =>
    [110, 111, 112].includes(question.id)
  )

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={cardStyles.outerBox}>
              <Typography variant='h4' sx={{ m: 4 }}>
                {t('surveyNames:ipAssessment')}
              </Typography>

              <Box sx={cardStyles.separatorCard}>
                <Typography variant='h6' sx={{ ml: 2 }}>
                  {t('ipAssessmentSurvey:technicalTitle')}
                </Typography>
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
              </Box>

              <Box sx={cardStyles.separatorCard}>
                <Typography variant='h6' sx={{ ml: 2 }}>
                  {t('ipAssessmentSurvey:mathematicalTitle')}
                </Typography>
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
              </Box>

              <Box sx={cardStyles.separatorCard}>
                <Typography variant='h6' sx={{ ml: 2 }}>
                  {t('ipAssessmentSurvey:computerProgramTitle')}
                </Typography>
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
              </Box>
              <Box sx={formStyles.stackBoxWrapper}>
                <Stack sx={formStyles.stack} direction='row'>
                  <Button
                    sx={formStyles.stackButton}
                    id='contact-form-button'
                    variant='contained'
                    type='submit'
                  >
                    {t('common:submit')}
                  </Button>
                  <ResetForm />
                </Stack>
              </Box>
            </Box>
          </form>
          {resultData && showResults && (
            <Results survey={survey} formResultData={resultData} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default IpAssessment
