import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import { IDEA_EVALUATION_DATA_KEY } from '../../../config'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import { FormValues } from '../../types'
import RenderSurvey from '../InteractiveForm/RenderSurvey'

import { useIdeaEvaluationResultData } from './IdeaEvaluationResultContext'

const IdeaEvaluation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('ideaEvaluation')

  const { resultData, setResultData } = useIdeaEvaluationResultData()

  const faculty = searchParams.get('faculty')
  const { formStyles } = styles

  const mutation = useSaveEntryMutation(survey?.id)

  useEffect(() => {
    if (!isLoading) {
      document
        ?.getElementById('idea-evaluation-main-section')
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
    sessionStorageKey: IDEA_EVALUATION_DATA_KEY,
  })

  if (!survey || isLoading || !faculty) return null

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }

    setResultData(submittedData)
    mutation.mutateAsync(submittedData)

    navigate({
      pathname: './results',
      search: location.search,
    })
  }

  return (
    <Box id='idea-evaluation-main-section' sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderSurvey
              control={control}
              watch={watch}
              questions={survey.Questions}
              surveyName={t('surveyNames:ideaEvaluation')}
            />
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default IdeaEvaluation
