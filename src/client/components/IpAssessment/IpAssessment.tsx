import React, { useState } from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styles from '../../styles'
import { FormValues, InputProps, Question } from '../../types'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import RenderQuestions from '../InteractiveForm/RenderQuestions'
import Results from './Results'
import ResetForm from '../Common/ResetForm'

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
    setResultData(submittedData)
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
              <h2 style={{ paddingLeft: '10px' }}>IP Assessment</h2>
              <Box sx={cardStyles.card}>
                <h3 style={{ paddingLeft: '10px' }}>
                  {t('ipAssessmentSurvey:technicalTitle')}
                </h3>
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
                <h3 style={{ paddingLeft: '10px' }}>
                  {t('ipAssessmentSurvey:mathematicalTitle')}
                </h3>
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
                <h3 style={{ paddingLeft: '10px' }}>
                  {t('ipAssessmentSurvey:computerProgramTitle')}
                </h3>
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
                <Box sx={formStyles.stackBoxWrapper}>
                  <Stack sx={formStyles.stack} direction="row">
                    <Button
                      sx={formStyles.stackButton}
                      id="contact-form-button"
                      variant="contained"
                      type="submit"
                    >
                      {t('common:submit')}
                    </Button>
                    <ResetForm />
                  </Stack>
                </Box>
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
