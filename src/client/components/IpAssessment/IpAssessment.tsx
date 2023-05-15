import { Box, Grid } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import RenderQuestions from '../InteractiveForm/RenderQuestions'

const IpAssessment = () => {
  const { i18n } = useTranslation()
  const { formStyles, cardStyles } = styles

  const { survey, isLoading } = useSurvey('ipAssessment')

  const { language } = i18n

  const { control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  if (isLoading) return null

  const questions = survey.Questions

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={10}>
          <Box sx={cardStyles.outerBox}>
            <Box sx={cardStyles.card}>
              {questions.map((question) => (
                <div key={question.id}>
                  {question.parentId === null && (
                    <RenderQuestions
                      control={control}
                      watch={watch}
                      question={question}
                      questions={questions}
                      language={language}
                    />
                  )}
                </div>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default IpAssessment
