import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'

import styles from '../../styles'
import Results from '../Results/Results'
import { FormValues } from '../../types'
import RenderSurvey from '../InteractiveForm/RenderSurvey'

const IdeaEvaluation = () => {
  const [showResults, setShowResults] = useState(false)
  const { formStyles } = styles

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    setShowResults(true)
  }

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderSurvey
              control={control}
              watch={watch}
              surveyName="ideaEvaluation"
            />
          </form>
          {showResults && <Results watch={watch} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default IdeaEvaluation
