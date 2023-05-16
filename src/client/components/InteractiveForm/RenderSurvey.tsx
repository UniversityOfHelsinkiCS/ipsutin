import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack } from '@mui/material'
import { InputProps, Question } from '../../types'
import RenderQuestions from './RenderQuestions'
import ResetForm from '../Common/ResetForm'
import styles from '../../styles'

const RenderSurvey = ({ survey, control, watch }: InputProps) => {
  const { t, i18n } = useTranslation()

  const { cardStyles, formStyles } = styles

  const { language } = i18n

  return (
    <Box sx={cardStyles.outerBox}>
      <Box sx={cardStyles.card}>
        {survey.Questions.map((question: Question) => (
          <div key={question.id}>
            {question.parentId === null && (
              <RenderQuestions
                control={control}
                watch={watch}
                question={question}
                questions={survey.Questions}
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
