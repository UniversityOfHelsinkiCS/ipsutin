import React, { BaseSyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack } from '@mui/material'
import { InputProps } from '../../types'
import RenderQuestions from './RenderQuestions'
import ResetForm from '../Common/ResetForm'
import { FORM_DATA_KEY } from '../../../config'
import styles from '../../styles'
import useQuestions from '../../hooks/useQuestions'

const RenderSurvey = ({
  control,
  watch,
  handleSubmit,
  isSubmitted,
}: InputProps) => {
  const { t, i18n } = useTranslation()
  const questions = useQuestions()
  const { cardStyles, formStyles } = styles
  const savedData = sessionStorage.getItem(FORM_DATA_KEY)

  console.log(savedData)

  const { language } = i18n

  const submitFormData = (event: BaseSyntheticEvent) => {
    handleSubmit(event)
  }

  if (!questions) return null

  return (
    <Box sx={cardStyles.outerBox}>
      <Box sx={cardStyles.card}>
        {questions.map((question) => (
          <div key={question.id}>
            {question.parentId === null && question.priority !== 0 && (
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
              type="submit"
              data-cy="submit-form-button"
              variant="contained"
              onClick={submitFormData}
            >
              {isSubmitted ? t('updateSubmit') : t('submit')}
            </Button>
            <ResetForm />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default RenderSurvey
