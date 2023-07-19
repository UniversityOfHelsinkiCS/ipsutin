import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

import { useIpAssessmentResultData } from './IpAssessmentResultDataContext'

const IpAssessment = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('ipAssessment')

  const { resultData, setResultData } = useIpAssessmentResultData()

  const faculty = searchParams.get('faculty')
  const { formStyles, cardStyles } = styles

  const { language } = i18n

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: resultData,
  })

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }

    setResultData(data)
    mutation.mutateAsync(submittedData)

    navigate('./results')
  }

  usePersistForm({
    value: watch(),
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
        </Grid>
      </Grid>
    </Box>
  )
}

export default IpAssessment
