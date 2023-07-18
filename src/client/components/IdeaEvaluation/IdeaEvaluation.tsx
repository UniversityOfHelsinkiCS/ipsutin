import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import { FormValues } from '../../types'
import RenderSurvey from '../InteractiveForm/RenderSurvey'

import Results from './Results'

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
