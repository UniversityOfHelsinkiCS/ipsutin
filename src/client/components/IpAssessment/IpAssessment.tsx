import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from '../../styles'
import Results from '../Results/Results'
import { FormValues, InputProps } from '../../types'
import RenderSurvey from '../InteractiveForm/RenderSurvey'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'

const IpAssessment = ({ faculty }: InputProps) => {
  const [showResults, setShowResults] = useState(false)
  const { formStyles } = styles
  const { survey, isLoading } = useSurvey('ipAssessment')

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
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
            <RenderSurvey control={control} watch={watch} survey={survey} />
          </form>
          {showResults && <Results watch={watch} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default IpAssessment
