import React, { BaseSyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack } from '@mui/material'
import useSurvey from '../../hooks/useSurvey'
import { InputProps } from '../../types'
import SelectFaculty from './SelectFaculty'
import RenderQuestions from './RenderQuestions'
import ResetForm from '../Common/ResetForm'
import { getSelectedDimensions } from '../../util/dimensions'
import { FORM_DATA_KEY } from '../../../config'
import styles from '../../styles'
import SelectCourse from './SelectCourse'

const RenderSurvey = ({
  control,
  watch,
  handleSubmit,
  isSubmitted,
}: InputProps) => {
  const { t, i18n } = useTranslation()
  const { survey, isLoading } = useSurvey()
  const { cardStyles, formStyles } = styles
  const savedData = sessionStorage.getItem(FORM_DATA_KEY)
  const [showQuestions, setShowQuestions] = useState(
    savedData && savedData !== '{}'
  )

  const { language } = i18n

  const dimensions = getSelectedDimensions(survey, watch)

  const isAllowedToProceed = () => {
    const isFacultySelected = watch('faculty') !== ''

    return isFacultySelected && dimensions.length > 0
  }

  const submitFormData = (event: BaseSyntheticEvent) => {
    handleSubmit(event)
  }

  if (isLoading) return null

  const questions = survey.Questions

  return (
    <Box sx={cardStyles.outerBox}>
      <SelectFaculty control={control} />
      <SelectCourse control={control} />
      <Box sx={cardStyles.card}>
        {questions.map((question) => (
          <div key={question.id}>
            {question.parentId === null && question.priority === 0 && (
              <RenderQuestions
                control={control}
                watch={watch}
                question={question}
                questions={questions}
                language={language}
              />
            )}

            {showQuestions &&
              question.parentId === null &&
              question.priority !== 0 && (
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

        <Box sx={formStyles.stackBox}>
          {!showQuestions ? (
            <Button
              data-cy="open-form-button"
              disabled={dimensions && !isAllowedToProceed()}
              onClick={() => setShowQuestions(true)}
            >
              {t('openForm')}
            </Button>
          ) : (
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
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default RenderSurvey
