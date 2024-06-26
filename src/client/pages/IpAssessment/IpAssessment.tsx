import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Question } from '@backend/types'
import { Box, Button, Stack, Typography } from '@mui/material'

import { IP_ASSESSMENT_DATA_KEY } from '../../../config'
import ResetForm from '../../components/Common/ResetForm'
import SectionHeading from '../../components/Common/SectionHeading'
import RenderQuestions from '../../components/InteractiveForm/RenderQuestions'
import { useResultData } from '../../components/InteractiveForm/ResultDataContext'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import styles, { productStyles } from '../../styles'
import { FormValues } from '../../types'

const IpAssessment = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { survey, isLoading } = useSurvey('ipAssessment')

  const { resultData, setResultData } = useResultData()

  const { formStyles } = styles

  const { language } = i18n

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: resultData,
  })

  usePersistForm({
    value: watch(),
    sessionStorageKey: IP_ASSESSMENT_DATA_KEY,
  })

  if (!survey || isLoading) return null

  const onSubmit = (data: FormValues) => {
    setResultData(data)
    mutation.mutateAsync(data)

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
    <Box component='section' sx={productStyles.productContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionHeading level='h1' sx={{ mt: 4, mx: 4 }}>
          {t('surveyNames:ipAssessment')}
        </SectionHeading>

        <Typography component='p' variant='h6' sx={{ m: 4 }}>
          {t('surveyInfos:ipAssessment')}
        </Typography>

        <Box component='section'>
          <SectionHeading level='h2' sx={{ mt: 4, mx: 4 }}>
            1. {t('ipAssessmentSurvey:technicalTitle')}
          </SectionHeading>

          {technical.map((question: Question) => (
            <React.Fragment key={question.id}>
              {question.parentId === null && (
                <RenderQuestions
                  control={control}
                  watch={watch}
                  question={question}
                  questions={technical}
                  language={language}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        <Box component='section'>
          <SectionHeading level='h2' sx={{ mt: 4, mx: 4 }}>
            2. {t('ipAssessmentSurvey:mathematicalTitle')}
          </SectionHeading>

          {mathematical.map((question: Question) => (
            <React.Fragment key={question.id}>
              {question.parentId === null && (
                <RenderQuestions
                  control={control}
                  watch={watch}
                  question={question}
                  questions={mathematical}
                  language={language}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        <Box component='section'>
          <SectionHeading level='h2' sx={{ mt: 4, mx: 4 }}>
            3. {t('ipAssessmentSurvey:computerProgramTitle')}
          </SectionHeading>

          {computerProgram.map((question: Question) => (
            <React.Fragment key={question.id}>
              {question.parentId === null && (
                <RenderQuestions
                  control={control}
                  watch={watch}
                  question={question}
                  questions={computerProgram}
                  language={language}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        <Box sx={formStyles.stackBoxWrapper}>
          <Stack sx={formStyles.stack} direction='row'>
            <Button
              sx={formStyles.stackButton}
              id='contact-form-button'
              variant='contained'
              color='secondary'
              type='submit'
            >
              {t('common:submit')}
            </Button>
            <ResetForm />
          </Stack>
        </Box>
      </form>
    </Box>
  )
}

export default IpAssessment
