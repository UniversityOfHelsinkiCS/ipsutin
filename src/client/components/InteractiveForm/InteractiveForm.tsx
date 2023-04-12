import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Grid } from '@mui/material'
// import usePersistForm from '../../hooks/usePersistForm'

import RenderSurvey from './RenderSurvey'
import { FormValues } from '../../types'
import { FORM_DATA_KEY } from '../../../config'
import styles from '../../styles'

const InteractiveForm = () => {
  const { formStyles } = styles

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
    const submittedData = data

    console.log(submittedData)
  }

  //  usePersistForm({ value: getValues(), sessionStorageKey: FORM_DATA_KEY })

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid id="ipsutin-main-section" item sm={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderSurvey
              control={control}
              watch={watch}
              handleSubmit={handleSubmit(onSubmit)}
            />
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default InteractiveForm
