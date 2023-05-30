import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Grid } from '@mui/material'

import RenderSurvey from '../InteractiveForm/RenderSurvey'
import { FormValues, InputProps } from '../../types'
import { FORM_DATA_KEY } from '../../../config'
import styles from '../../styles'

import ResultButtons from '../ResultButtons/ResultButtons'
import useSurvey from '../../hooks/useSurvey'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'

const Licences = ({ faculty }: InputProps) => {
  const [showResults, setShowResults] = useState(false)
  const { formStyles } = styles
  const { survey, isLoading } = useSurvey('licenses')

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
              surveyName="Licenses"
            />
          </form>
          {showResults && <ResultButtons watch={watch} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Licences
