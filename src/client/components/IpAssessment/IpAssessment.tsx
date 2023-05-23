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
  const [showTechnicalResults, setShowTechnicalResults] = useState(false)
  const [showMathematicalResults, setShowMathematicalResults] = useState(false)
  const [showProgramResults, setShowProgramResults] = useState(false)
  const { formStyles } = styles
  const { survey, isLoading } = useSurvey('ipAssessment')

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  const onSubmitTechnical = (data: FormValues) => {
    const submittedData = { ...data, faculty }
    mutation.mutateAsync(submittedData)
    setShowTechnicalResults(true)
  }

  const onSubmitMathematical = (data: FormValues) => {
    const submittedData = { ...data, faculty }
    mutation.mutateAsync(submittedData)
    setShowMathematicalResults(true)
  }

  const onSubmitProgram = (data: FormValues) => {
    const submittedData = { ...data, faculty }
    mutation.mutateAsync(submittedData)
    setShowProgramResults(true)
  }

  if (isLoading) return null

  const mathematical = survey.Questions.filter((question) =>
    [101, 102, 103, 104].includes(question.id)
  )
  const technical = survey.Questions.filter((question) =>
    [105, 106, 107, 108, 109].includes(question.id)
  )
  const computerProgram = survey.Questions.filter((question) =>
    [110, 111, 112].includes(question.id)
  )

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmitTechnical)}>
            <RenderSurvey
              control={control}
              watch={watch}
              questions={technical}
              surveyName="Technical solutions"
            />
          </form>
          {showTechnicalResults && <Results watch={watch} />}
          <form onSubmit={handleSubmit(onSubmitMathematical)}>
            <RenderSurvey
              control={control}
              watch={watch}
              questions={mathematical}
              surveyName="Mathematical models"
            />
          </form>
          {showMathematicalResults && <Results watch={watch} />}
          <form onSubmit={handleSubmit(onSubmitProgram)}>
            <RenderSurvey
              control={control}
              watch={watch}
              questions={computerProgram}
              surveyName="Computer programs"
            />
          </form>
          {showProgramResults && <Results watch={watch} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default IpAssessment
