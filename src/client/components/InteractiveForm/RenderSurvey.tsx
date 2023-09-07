import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack, Typography } from '@mui/material'

import styles from '../../styles'
import { InputProps } from '../../types'
import ResetForm from '../Common/ResetForm'

import RenderQuestions from './RenderQuestions'

const RenderSurvey = ({
  questions,
  control,
  watch,
  surveyName,
  surveyInfo,
}: InputProps) => {
  const { t, i18n } = useTranslation()

  const { cardStyles, formStyles } = styles

  const { language } = i18n

  if (!questions) return null

  return (
    <Box sx={cardStyles.outerBox}>
      <Typography variant='h4' sx={{ m: 4 }}>
        {surveyName}
      </Typography>
      <Typography variant='h6' sx={{ m: 4 }}>
        {surveyInfo}
      </Typography>
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

        <Box sx={formStyles.stackBoxWrapper}>
          <Stack sx={formStyles.stack} direction='row'>
            <Button
              sx={formStyles.stackButton}
              id='contact-form-button'
              variant='contained'
              type='submit'
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
