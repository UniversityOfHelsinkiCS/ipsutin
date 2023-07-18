import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Question } from '@backend/types'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'

import { IP_ASSESSMENT_DATA_KEY } from '../../../config'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import { FormValues } from '../../types'
import ResetForm from '../Common/ResetForm'
import RenderQuestions from '../InteractiveForm/RenderQuestions'

import Results from './Results'

const IpAssessment = () => {
  const { t, i18n } = useTranslation()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('ipAssessment')

  const sessionLocation = sessionStorage.getItem(
    'ipsutin-ip-assessment-session-location'
  )

  const [showResults, setShowResults] = useState(sessionLocation === 'results')
  const [resultData, setResultData] = useState<FormValues>({})

  const faculty = searchParams.get('faculty')
  const { formStyles, cardStyles } = styles
  const { language } = i18n

  const mutation = useSaveEntryMutation(survey?.id)

  const getSavedInstance = useCallback(() => {
    const savedData = sessionStorage.getItem(IP_ASSESSMENT_DATA_KEY)
    if (savedData) return JSON.parse(savedData)

    return {}
  }, [])

  const savedFormData = getSavedInstance()

  useEffect(() => {
    const savedFormDataString = JSON.stringify(savedFormData)
    const resultDataString = JSON.stringify(resultData)

    if (savedFormDataString !== resultDataString) {
      setResultData(savedFormData)
    }
  }, [savedFormData, resultData])

  const { handleSubmit, control, watch, getValues } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: savedFormData,
  })

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }

    setResultData(data)
    mutation.mutateAsync(submittedData)

    sessionStorage.setItem('ipsutin-ip-assessment-session-location', 'results')
    setShowResults(true)
  }

  usePersistForm({
    value: getValues(),
    sessionStorageKey: IP_ASSESSMENT_DATA_KEY,
  })

  if (!survey || isLoading || !faculty) return null

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
              <Typography variant='h6' sx={{ m: 4 }}>
                {t('surveyInfos:ipAssessment')}
              </Typography>

              <Box sx={cardStyles.separatorCard}>
                <Typography variant='h6' sx={{ ml: 2 }}>
                  1. {t('ipAssessmentSurvey:technicalTitle')}
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
                  2. {t('ipAssessmentSurvey:mathematicalTitle')}
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
                  3. {t('ipAssessmentSurvey:computerProgramTitle')}
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
          {resultData && showResults && <Results formResultData={resultData} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default IpAssessment
