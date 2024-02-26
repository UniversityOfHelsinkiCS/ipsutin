import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Question } from '@backend/types'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'

import { IP_ASSESSMENT_DATA_KEY } from '../../../config'
import ResetForm from '../../components/Common/ResetForm'
import RenderQuestions from '../../components/InteractiveForm/RenderQuestions'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import { FormValues } from '../../types'

import { useIpAssessmentResultData } from './IpAssessmentResultDataContext'

const IpAssessment = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('ipAssessment')

  const { resultData, setResultData } = useIpAssessmentResultData()

  const faculty = searchParams.get('faculty')
  const { formStyles, cardStyles } = styles

  const { language } = i18n

  const mutation = useSaveEntryMutation(survey?.id)

  useEffect(() => {
    if (!isLoading) {
      document
        ?.getElementById('ip-assessment-main-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isLoading])

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: resultData,
  })

  usePersistForm({
    value: watch(),
    sessionStorageKey: IP_ASSESSMENT_DATA_KEY,
  })

  if (!survey || isLoading || !faculty) return null

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }

    setResultData(data)
    mutation.mutateAsync(submittedData)

    navigate({
      pathname: './results',
      search: location.search,
    })
  }

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
    <Box id='ip-assessment-main-section' sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={cardStyles.outerBox}>
              <Typography component='h2' variant='h5' sx={formStyles.heading}>
                {t('surveyNames:ipAssessment')}
              </Typography>
              <Typography component='p' variant='h6' sx={{ m: 4 }}>
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
