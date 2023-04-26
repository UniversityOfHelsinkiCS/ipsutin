import React, { BaseSyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack } from '@mui/material'
import { InputProps } from '../../types'
import RenderQuestions from './RenderQuestions'
import ResetForm from '../Common/ResetForm'
import SendSummaryEmail from '../SendEmail/SendSummaryEmail'
import { FORM_DATA_KEY } from '../../../config'
import styles from '../../styles'
import useSurvey from '../../hooks/useSurvey'

const RenderSurvey = ({ control, watch, handleSubmit }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { survey, isLoading } = useSurvey()
  const { cardStyles, formStyles } = styles
  const savedData = sessionStorage.getItem(FORM_DATA_KEY)

  console.log(savedData)

  const { language } = i18n

  const submitFormData = (event: BaseSyntheticEvent) => {
    handleSubmit(event)
  }

  if (isLoading) return null

  return (
    <Box sx={cardStyles.outerBox}>
      <Box sx={cardStyles.card}>
        {survey.Questions.map((question) => (
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
              type="submit"
              data-cy="submit-form-button"
              variant="contained"
              onClick={submitFormData}
            >
              {t('contact:submit')}
            </Button>
            <SendSummaryEmail />
            <ResetForm />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default RenderSurvey
