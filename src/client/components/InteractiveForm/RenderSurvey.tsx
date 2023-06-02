import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack, Typography } from '@mui/material'

import RenderQuestions from './RenderQuestions'
import ResetForm from '../Common/ResetForm'

import styles from '../../styles'
import { InputProps, Question } from '../../types'

const RenderSurvey = ({
  questions,
  control,
  watch,
  surveyName,
}: InputProps) => {
  const { t, i18n } = useTranslation()

  const { cardStyles, formStyles } = styles

  const { language } = i18n

  return (
    <Box sx={cardStyles.outerBox}>
      <Typography variant="h4" sx={{ m: 4 }}>
        {surveyName}
      </Typography>
      <Box sx={cardStyles.card}>
        {questions.map((question: Question) => (
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

        <Box sx={formStyles.stackBoxWrapper}>
          <Stack sx={formStyles.stack} direction="row">
            <Button
              sx={formStyles.stackButton}
              id="contact-form-button"
              variant="contained"
              type="submit"
            >
              {t('common:submit')}
            </Button>
            <ResetForm />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default RenderSurvey
