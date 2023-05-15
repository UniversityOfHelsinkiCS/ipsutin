import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Grid } from '@mui/material'

import RenderSurvey from '../InteractiveForm/RenderSurvey'
import { FormValues } from '../../types'
import { FORM_DATA_KEY } from '../../../config'
import styles from '../../styles'

import Contact from '../SendEmail/Contact'

const Licences = () => {
  const [showContact, setShowContact] = useState(false)
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
    console.log(data)
    setShowContact(true)
  }

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderSurvey control={control} watch={watch} />
          </form>
          {showContact && <Contact />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Licences
