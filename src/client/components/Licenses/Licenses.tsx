import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import { LICENSES_DATA_KEY } from '../../../config'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import { FormValues } from '../../types'
import RenderSurvey from '../InteractiveForm/RenderSurvey'

import Results from './Results'

const Licences = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('licenses')
  const [showResults, setShowResults] = useState(false)
  const [resultData, setResultData] = useState<FormValues>({})

  const faculty = searchParams.get('faculty')
  const { formStyles } = styles

  const mutation = useSaveEntryMutation(survey?.id)

  const getSavedInstance = useCallback(() => {
    const savedData = sessionStorage.getItem(LICENSES_DATA_KEY)
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

    setShowResults(true)
  }

  usePersistForm({ value: getValues(), sessionStorageKey: LICENSES_DATA_KEY })

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
