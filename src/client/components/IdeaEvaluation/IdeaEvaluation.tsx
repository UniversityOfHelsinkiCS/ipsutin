import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'

import Results from './Results'
import RenderSurvey from '../InteractiveForm/RenderSurvey'

import { FormValues } from '../../types'
import styles from '../../styles'

const IdeaEvaluation = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('ideaEvaluation')
  const mutation = useSaveEntryMutation(survey?.id)
  const [showResults, setShowResults] = useState(false)
  const [resultData, setResultData] = useState<FormValues>(null)

  const faculty = searchParams.get('faculty')
  const { formStyles } = styles

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

  return (
    <Box sx={formStyles.formWrapper}>
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
          {resultData && showResults && <Results formResultData={resultData} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default IdeaEvaluation
