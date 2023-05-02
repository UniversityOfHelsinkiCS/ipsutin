import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Grid } from '@mui/material'
// import usePersistForm from '../../hooks/usePersistForm'

import RenderSurvey from './RenderSurvey'
import { FormValues } from '../../types'
import { FORM_DATA_KEY } from '../../../config'
import styles from '../../styles'

import Contact from '../SendEmail/Contact'

const InteractiveForm = () => {
  const [answers, setAnswers] = useState({})
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

  const fetchAnswers = (formData: FormValues) => {
    const q = document.getElementsByClassName('questions')

    const titles = Array.from(q).map((y) => y.innerHTML)
    const labels: any[] = []

    Object.values(formData).forEach((value) => {
      if (value) {
        const x = document.getElementById(`choice-select-${value}`)
        labels.push(x.outerText)
      } else {
        labels.push('')
      }
    })
    return Object.fromEntries(titles.map((_, i) => [titles[i], labels[i]]))
  }
  const onSubmit = (data: FormValues) => {
    setAnswers(fetchAnswers(data))
  }

  //  usePersistForm({ value: getValues(), sessionStorageKey: FORM_DATA_KEY })

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid id="ipsutin-main-section" item sm={12}>
          <form onSubmit={handleSubmit(() => setShowContact(true))}>
            <h1>Licences</h1>
            <RenderSurvey
              control={control}
              watch={watch}
              handleSubmit={handleSubmit(onSubmit)}
              answers={answers}
            />
          </form>
          {showContact && <Contact />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default InteractiveForm
