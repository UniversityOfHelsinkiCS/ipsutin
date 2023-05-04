import React from 'react'
import { Box, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ResultBox from './ResultBox'
import useQuestions from '../../hooks/useQuestions'
import RenderQuestions from '../InteractiveForm/RenderQuestions'
import styles from '../../styles'

const IdeaEvaluation = () => {
  const { i18n } = useTranslation()
  const { formStyles, cardStyles } = styles

  const questions = useQuestions()

  const { language } = i18n

  const { control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  if (!questions) return null

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item>
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
        <Grid item>
          <ResultBox watch={watch} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default IdeaEvaluation
