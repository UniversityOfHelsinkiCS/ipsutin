import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack, Typography } from '@mui/material'

import styles from '../../styles'
import { InputProps } from '../../types'
import ResetForm from '../Common/ResetForm'
import SectionHeading from '../Common/SectionHeading'

import RenderQuestions from './RenderQuestions'

const RenderSurvey = ({
  questions,
  control,
  watch,
  surveyName,
  surveyInfo,
}: InputProps) => {
  const { t, i18n } = useTranslation()

  const { formStyles } = styles

  const { language } = i18n

  if (!questions) return null

  return (
    <>
      <SectionHeading level='h1' sx={{ mt: 4, mx: 4 }}>
        {surveyName}
      </SectionHeading>

      <Typography component='p' variant='h6' sx={{ m: 4 }}>
        {surveyInfo}
      </Typography>

      {questions.map((question) => (
        <React.Fragment key={question.id}>
          {question.parentId === null && (
            <RenderQuestions
              control={control}
              watch={watch}
              question={question}
              questions={questions}
              language={language}
            />
          )}
        </React.Fragment>
      ))}

      <Box sx={formStyles.stackBoxWrapper}>
        <Stack sx={formStyles.stack} direction='row'>
          <Button
            sx={formStyles.stackButton}
            id='contact-form-button'
            variant='contained'
            color='secondary'
            type='submit'
          >
            {t('common:submit')}
          </Button>
          <ResetForm />
        </Stack>
      </Box>
    </>
  )
}

export default RenderSurvey
