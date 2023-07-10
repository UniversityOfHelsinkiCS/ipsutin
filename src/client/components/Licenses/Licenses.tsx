import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Box, Grid } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'

import Results from './Results'
import RenderSurvey from '../InteractiveForm/RenderSurvey'

import styles from '../../styles'
import { FormValues } from '../../types'

import { FORM_DATA_KEY } from '../../../config'

const Licences = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('licenses')
  const [showResults, setShowResults] = useState(false)
  const [resultData, setResultData] = useState<FormValues>(null)

  const faculty = searchParams.get('faculty')
  const { formStyles } = styles

  const mutation = useSaveEntryMutation(survey?.id)

  const getSavedInstance = useCallback(() => {
    const savedData = sessionStorage.getItem(FORM_DATA_KEY)
    if (savedData) return JSON.parse(savedData)

    return {}
  }, [])

  const savedFormData = getSavedInstance()

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: savedFormData,
  })

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }
    setResultData(data)

    mutation.mutateAsync(submittedData)

    setShowResults(true)
  }

  if (isLoading || !faculty) return null

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderSurvey
              control={control}
              watch={watch}
              questions={survey.Questions}
              surveyName={t('surveyNames:licences')}
              surveyInfo={t('surveyInfos:licences')}
            />
          </form>
          {resultData && showResults && <Results formResultData={resultData} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Licences
